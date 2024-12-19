# Use an official Python image as the base
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application code to the container
COPY . .

# Install system-level dependencies required for specific libraries (e.g., ffmpeg)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your app runs on
EXPOSE 8080

# Specify the command to run your application
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8080", "app:app"]

