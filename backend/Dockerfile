FROM python:3.10

WORKDIR /app

COPY . .

ENV PYTHONPATH "${PYTHONPATH}:/app"

RUN pip install --no-cache-dir -r ./lib/requirements.txt

EXPOSE 5000

CMD ["python", "src/main.py"]
