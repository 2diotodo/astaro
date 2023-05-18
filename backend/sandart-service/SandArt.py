import cv2
import numpy as np
import sys
import random
import os
import math
from collections import deque

import boto3
import configparser
from botocore.exceptions import NoCredentialsError
import urllib.request

sys.setrecursionlimit(100000)


def create_sand_art_video(image_url):
    global previous_color
    previous_color = (100, 30, 0)
    # image_url = "https://astaro.s3.ap-northeast-2.amazonaws.com/ab5e3b69-18ba-49db-9d2b-2bcad4c3345b.png"
    fourcc = cv2.VideoWriter_fourcc(*'h264')
    fps = 30  # 비디오의 프레임 수
    isColor = True  # 컬러 비디오인 경우 True, 그렇지 않으면 False

    # 이미지 파일 경로 설정
    current_directory = os.path.dirname(os.path.realpath(__file__))
    image_path = os.path.join(
        current_directory, "static", "images", "fable7.jpg")

    # 웹 이미지를 메모리로 로드
    with urllib.request.urlopen(image_url) as url:
        img_array = np.array(bytearray(url.read()), dtype=np.uint8)
        src = cv2.imdecode(img_array, -1)

    # 이미지 불러오기
    # src = cv2.imread(image_path)

    # Gaussian blur 적용
    # blurred_src = cv2.GaussianBlur(src, (3, 3), 300)

    # blurred_src = cv2.bilateralFilter(src, 9, 75, 75)

    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)

    # 히스토그램 평활화 적용
    # equalized_gray = cv2.equalizeHist(gray)

    # 전역 이진화 적용
    ret, binary = cv2.threshold(gray, 230, 255, cv2.THRESH_BINARY)

    def initial_sand_color():
        # r = random.randint(210, 240)
        # g = random.randint(180, 210)
        # b = random.randint(100, 130)
        r = random.randint(220, 250)
        g = random.randint(190, 220)
        b = random.randint(110, 140)

        return (b, g, r)

    def random_sand_color(previous_color):
        r = previous_color[2] + random.randint(-1, 1)
        g = previous_color[1] + random.randint(-1, 1)
        b = previous_color[0] + random.randint(-1, 1)

        r = min(max(r, 60), 70)
        g = min(max(g, 20), 30)
        b = min(max(b, 0), 10)

        return (b, g, r)

    output = np.zeros((*binary.shape, 3), dtype=np.uint8)

    height, width = binary.shape
    # height, width = 1280, 720

    for i in range(height):
        for j in range(width):
            output[i, j] = initial_sand_color()

    visited = np.zeros_like(binary, dtype=bool)

    video_path = "drawing_process.mp4"

    # VideoWriter 객체 생성
    video = cv2.VideoWriter(video_path, fourcc,
                            fps, (width, height), isColor=True)

    def bfs(i, j, step):
        global previous_color
        queue = deque([(i, j)])
        directions = [(1, 0), (0, 1), (-1, 0), (0, -1),
                      (1, 1), (-1, -1), (1, -1), (-1, 1)]

        while queue:
            i, j = queue.popleft()

            if i < 0 or i >= height or j < 0 or j >= width or visited[i, j] or binary[i, j] != 0:
                continue

            visited[i, j] = True
            output[i, j] = random_sand_color(previous_color)
            previous_color = output[i, j]

            # ran_show = int(random.randrange(500, 1000))
            ran_show = 1000

            if ((i * j) % (ran_show)) == 0:
                video.write(cv2.GaussianBlur(output, (3, 3), 0))  # 현재 프레임 저장
                # cv2.waitKey(1)

            random.shuffle(directions)
            # step = random.randrange(1, 3)
            step = 1

            for dx, dy in directions:
                ni, nj = i + dx * step, j + dy * step
                if random.random() < 0.5:
                    queue.append((ni, nj))
                else:
                    dfs(ni, nj, step)

    def dfs(i, j, step, depth=0, max_recursion_depth=1000):
        global previous_color
        if i < 0 or i >= height or j < 0 or j >= width or visited[i, j] or binary[i, j] != 0:
            return

        visited[i, j] = True
        output[i, j] = random_sand_color(previous_color)
        previous_color = output[i, j]

        ran_show = 1000

        if ((i * j) % (ran_show)) == 0:
            video.write(cv2.GaussianBlur(output, (3, 3), 0))  # 현재 프레임 저장
            # cv2.waitKey(1)

        if depth >= max_recursion_depth:
            return

        # step = random.randrange(1, 5)

        offsets = list(range(-2 * step, 3 * step, step))
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
    # output = cv2.GaussianBlur(output, (3, 3), 0)

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
    image_url = "https://astaro.s3.ap-northeast-2.amazonaws.com/03c27b9e-956d-4a7a-a6d5-a715c4c9ba7a.png"
    video_path = create_sand_art_video(image_url)

    # S3 버킷에 업로드
    bucket_name = "astaro"
    s3_file_name = "drawing_process.mp4"
    upload_to_s3(video_path, bucket_name, s3_file_name)
