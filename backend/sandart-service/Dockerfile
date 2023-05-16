FROM python:3.11

WORKDIR  /workspace
 
COPY requirements.txt .
 
EXPOSE 8500

RUN pip install -r requirements.txt

RUN apt-get update &&\
    apt-get install libgl1-mesa-glx -y &&\
    apt-get install libglib2.0-0 -y &&\
    apt-get install ffmpeg x264 libx264-dev -y&&\
    apt-get install watch -y
 
COPY . /workspace/
 
CMD ["python", "app.py"]