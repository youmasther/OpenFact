# syntax=docker/dockerfile:1

# -------------------------------------------------------
# Base image
# -------------------------------------------------------
ARG PYTHON_VERSION=3.12
FROM python:${PYTHON_VERSION}-slim AS base

# -------------------------------------------------------
# Environment variables
# -------------------------------------------------------

# Prevents Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# -------------------------------------------------------
# Working directory
# -------------------------------------------------------
WORKDIR /app

# -------------------------------------------------------
# Create non-root user
# -------------------------------------------------------
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# -------------------------------------------------------
# Install dependencies
# -------------------------------------------------------

# Use Docker cache for pip to speed up builds
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=backend/requirements.txt,target=requirements.txt \
    python -m pip install --no-cache-dir -r requirements.txt

# -------------------------------------------------------
# Copy project files
# -------------------------------------------------------
COPY backend/ .

# -------------------------------------------------------
# Permissions
# -------------------------------------------------------
RUN chown -R appuser:appuser /app

# -------------------------------------------------------
# Switch to non-root user
# -------------------------------------------------------
USER appuser

# -------------------------------------------------------
# Expose port
# -------------------------------------------------------
EXPOSE 8000

# -------------------------------------------------------
# Run Django development server (marathon mode)
# -------------------------------------------------------
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
