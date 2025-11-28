from django.test import Client, TestCase


class SectionsAPITest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_sections_endpoint_returns_payload(self):
        response = self.client.get("/api/sections/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("sections", data)
        self.assertGreater(len(data["sections"]), 0)
        first_section = data["sections"][0]
        self.assertIn("items", first_section)
        self.assertIsInstance(first_section["items"], list)
