from django.db import models

from Products.models import Products,Icons,Images
from UserApp.models import User


default_qr_json='{"width":300,"height":300,"data":"https://qr-code-styling.com","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"extra-rounded","color":"#6a1a4c"},"backgroundOptions":{"color":"#ffffff"},"image":"10cc19bd484118dbcd0a7886a38ceddc.png","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"extra-rounded","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}}'


class Product_wrapper(models.Model):
    Product = models.ForeignKey(Products, on_delete=models.CASCADE,blank=True)
    QrJson = models.TextField(default=default_qr_json)
    Quantity=models.IntegerField(default=1)
    size=models.TextField(default="",blank=True,null=True)
    gift_wrap=models.BooleanField(default=False)

    def __str__(self):
        return f"{self.Product.id}_"


