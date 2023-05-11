from flask import Flask, jsonify, request, redirect
import SandArt

app = Flask(__name__)


@app.route('/api/run-script', methods=['POST'])
def run_script():
    video_path = SandArt.create_sand_art_video()

    # S3 버킷에 업로드
    bucket_name = "astaro"
    s3_file_name = "drawing_process.mp4"
    SandArt.upload_to_s3(video_path, bucket_name, s3_file_name)

    # S3에 업로드된 비디오 파일의 URL 반환
    s3_video_url = f'https://{bucket_name}.s3.amazonaws.com/{s3_file_name}'
    return redirect(s3_video_url)


if __name__ == '__main__':
    app.run(debug=True)
