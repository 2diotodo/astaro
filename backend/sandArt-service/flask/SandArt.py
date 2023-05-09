import cv2
import numpy as np
import sys
import random
import os
from collections import deque

import boto3
import configparser
from botocore.exceptions import NoCredentialsError

sys.setrecursionlimit(100000)


def create_sand_art_video():
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    fps = 30  # 비디오의 프레임 수
    isColor = True  # 컬러 비디오인 경우 True, 그렇지 않으면 False

    # 이미지 파일 경로 설정
    current_directory = os.path.dirname(os.path.realpath(__file__))
    image_path = os.path.join(
        current_directory, "static", "images", "fable7.jpg")

    # 이미지 불러오기
    src = cv2.imread(image_path)

    # Gaussian blur 적용
    blurred_src = cv2.GaussianBlur(src, (3, 3), 300)

    # blurred_src = cv2.bilateralFilter(src, 9, 75, 75)

    gray = cv2.cvtColor(blurred_src, cv2.COLOR_BGR2GRAY)

    # 히스토그램 평활화 적용
    equalized_gray = cv2.equalizeHist(gray)

    # 전역 이진화 적용
    ret, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)

    def initial_sand_color():
        r = random.randint(133, 173)
        g = random.randint(82, 122)
        b = random.randint(31, 71)

        return (b, g, r)

    def random_sand_color(intensity):
        r = random.randint(0, 100)
        g = random.randint(0 + intensity * 10, 40 + intensity * 5)
        b = random.randint(0 + intensity * 10, 40 + intensity * 5)

        return (b, g, r)

    output = np.zeros((*binary.shape, 3), dtype=np.uint8)

    height, width = binary.shape

    for i in range(height):
        for j in range(width):
            output[i, j] = initial_sand_color()

    visited = np.zeros_like(binary, dtype=bool)

    video_path = "drawing_process.mp4"

    # VideoWriter 객체 생성
    video = cv2.VideoWriter(video_path, fourcc,
                            fps, (width, height), isColor=True)

    def bfs(i, j, step):
        queue = deque([(i, j)])
        directions = [(1, 0), (0, 1), (-1, 0), (0, -1),
                      (1, 1), (-1, -1), (1, -1), (-1, 1)]

        while queue:
            i, j = queue.popleft()

            if i < 0 or i >= height or j < 0 or j >= width or visited[i, j] or binary[i, j] != 0:
                continue

            visited[i, j] = True
            # output[i, j] = random_sand_color()
            for a in range(3):
                for b in range(3):
                    if i + a >= 0 and j + b >= 0 and i + a < height and j + b < width:
                        output[i + a, j +
                               b] = random_sand_color(3 - (a*b//3) % 3)

            ran_show = int(random.randrange(1000, 3000))

            if ((i * j) % (ran_show)) == 0:
                cv2.imshow("output", output)
                video.write(output)  # 현재 프레임 저장
                cv2.waitKey(1)

            random.shuffle(directions)
            # step = random.randrange(1, 5)

            for dx, dy in directions:
                ni, nj = i + dx * step, j + dy * step
                if random.random() < 0.5:
                    queue.append((ni, nj))
                else:
                    dfs(ni, nj, step)

    def dfs(i, j, step, depth=0, max_recursion_depth=1000):
        if i < 0 or i >= height or j < 0 or j >= width or visited[i, j] or binary[i, j] != 0:
            return

        visited[i, j] = True
        # output[i, j] = random_sand_color()
        # flag = 0
        for a in range(3):
            for b in range(3):
                # flag = random.randrange(1, 4)
                if i + a >= 0 and j + b >= 0 and i + a < height and j + b < width:
                    output[i + a, j + b] = random_sand_color(3 - (a*b//3) % 3)

        ran_show = int(random.randrange(1000, 3000))

        if ((i * j) % (ran_show)) == 0:
            cv2.imshow("output", output)
            video.write(output)  # 현재 프레임 저장
            cv2.waitKey(1)

        if depth >= max_recursion_depth:
            return

        # step = random.randrange(1, 5)

        offsets = list(range(-1 * step, 2 * step, step))
        random.shuffle(offsets)

        for k in offsets:
            for l in offsets:
                ni, nj = i + k, j + l
                dfs(ni, nj, step, depth + 1, max_recursion_depth)

    start_i, start_j = None, None
    for i in range(0, height):
        for j in range(0, width):
            if binary[i, j] == 0 and not visited[i, j]:
                start_i, start_j = i, j
                step = 1
                if random.random() < 0.5:
                    bfs(start_i, start_j, step)
                else:
                    dfs(start_i, start_j, step, max_recursion_depth=10000)

    # 부드러운 선을 위해 가우시안 블러 적용
    output = cv2.GaussianBlur(output, (3, 3), 0)

    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # 비디오 객체 닫기
    video.release()

    return video_path


def upload_to_s3(file_path, bucket_name, s3_file_name):
    # config.ini 파일 읽기
    config = configparser.ConfigParser()
    config.read('config.ini')

    # AWS 자격 증명 정보 가져오기
    aws_access_key_id = config.get('aws', 'AWS_ACCESS_KEY_ID')
    aws_secret_access_key = config.get('aws', 'AWS_SECRET_ACCESS_KEY')

    s3 = boto3.client('s3',
                      aws_access_key_id=aws_access_key_id,
                      aws_secret_access_key=aws_secret_access_key)

    try:
        # ContentType과 ACL 설정 추가
        extra_args = {
            'ContentType': 'video/mp4',
            'ACL': 'public-read'
        }
        s3.upload_file(file_path, bucket_name,
                       s3_file_name, ExtraArgs=extra_args)
        print(
            f"File {file_path} uploaded to {bucket_name}/{s3_file_name} successfully.")
    except FileNotFoundError:
        print(f"The file {file_path} was not found.")
        raise
    except NoCredentialsError:
        print("Credentials not available")
        raise


if __name__ == "__main__":
    video_path = create_sand_art_video()

    # S3 버킷에 업로드
    bucket_name = "astaro"
    s3_file_name = "drawing_process.mp4"
    upload_to_s3(video_path, bucket_name, s3_file_name)
    print('hello')