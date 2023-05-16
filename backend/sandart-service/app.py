from flask import Flask, jsonify, request, redirect
import SandArt
import uuid

app = Flask(__name__)


@app.route('/api/run-script', methods=['POST'])
def run_script():
    # 이미지 URL을 요청 본문에서 가져오기
    image_url = request.json.get('imageUrl')
    if not image_url:
        return jsonify({"error": "image_url is required"}), 400

    video_path = SandArt.create_sand_art_video(image_url)

    # S3 버킷에 업로드
    bucket_name = "astaro"
    s3_file_name = str(uuid.uuid1()) + ".mp4"
    SandArt.upload_to_s3("h264_"+video_path, bucket_name, s3_file_name)

    # S3에 업로드된 비디오 파일의 URL 반환
    s3_video_url = f'https://{bucket_name}.s3.amazonaws.com/{s3_file_name}'
    return s3_video_url


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8500, debug=True)
