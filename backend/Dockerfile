FROM  python:3.12.3-bullseye
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

WORKDIR /backend

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -v -r requirements.txt
COPY . .
EXPOSE 8000
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod a+x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

# Running shell command due to parsing issues.
# TODO: Fix the parsing issue.
CMD uvicorn api_engine.asgi:application --host 0.0.0.0 --lifespan off