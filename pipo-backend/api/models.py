from django.db import models

# Create your models here.
# api/models.py
class Bid(models.Model):
    issuer_id = models.CharField(max_length=200)
    investor_id = models.CharField(max_length=200)
    bid_price = models.IntegerField()
    no_of_shares = models.IntegerField()
    
