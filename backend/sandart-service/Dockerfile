FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the contents of the project directory into the container at /app
COPY . /app

ENV PATH="/app/venv/bin:$PATH"

COPY . /app

EXPOSE 8500

ENV FLASK_APP=Flask.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=8500"]