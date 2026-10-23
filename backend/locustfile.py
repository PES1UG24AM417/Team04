
from locust import HttpUser, task, between


class StreamHubPerformanceUser(HttpUser):
    wait_time = between(0.1, 0.3)

    @task
    def test_login(self):
        payload = {
            "email": "performance-test@example.com",
            "password": "WrongPassword123!"
        }

        with self.client.post(
            "/auth/login",
            json=payload,
            catch_response=True,
            name="POST /auth/login"
        ) as response:
            if response.status_code in (401, 403):
                response.success()
            else:
                response.failure(
                    f"Unexpected status code: {response.status_code}"
                )
