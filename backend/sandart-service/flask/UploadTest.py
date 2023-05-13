import configparser

import boto3
from botocore.exceptions import NoCredentialsError


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
        ExtraArgs = {
            'ContentType': 'video/webm'
        }
        with open(file_path, "rb") as f:
            s3.upload_fileobj(f, bucket_name, s3_file_name, ExtraArgs)
        print(
            f"File {file_path} uploaded to {bucket_name}/{s3_file_name} successfully.")
    except FileNotFoundError:
        print(f"The file {file_path} was not found.")
        raise
    except NoCredentialsError:
        print("Credentials not available")
        raise

if __name__ == "__main__":
    video_path = "./file_example_WEBM_640_1_4MB.webm"

    # S3 버킷에 업로드
    bucket_name = "astaro"
    s3_file_name = "file_example_WEBM_640_1_4MB.webm"
    upload_to_s3(video_path, bucket_name, s3_file_name)
    print('hello')