from django.db import models
from UserApp.models import User


class Coupons(models.Model):
    Code = models.CharField(max_length=20, help_text="length should be less than 20 character")
    discount = models.IntegerField(help_text="discount percent on whole cart total")
    discription = models.TextField()
    createdon =models.DateTimeField(auto_now=True)



    active = models.BooleanField(default=False)


    for_all = models.BooleanField(default=True)
    onlyFor = models.ManyToManyField(User,related_name="onlyForUser",blank=True)
    usedBY = models.ManyToManyField(User,related_name="usedByUser",blank=True)

    def __str__(self):
        return f"{self.Code}_{self.discount}_{self.active}"

