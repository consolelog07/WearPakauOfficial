from django.db import models

class Restricted_hostname(models.Model):
    hostname=models.TextField()

    def __str__(self):
        return self.hostname