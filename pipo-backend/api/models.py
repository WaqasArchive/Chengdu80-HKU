from django.db import models

# Create your models here.
# api/models.py

class Person(models.Model):
    identify = models.IntegerField()
    name = models.CharField(max_length=200)

class IPO(models.Model):
    issuer = models.ForeignKey(Person, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=4)
    reference_price = models.DecimalField(decimal_places=2,max_digits=10)
    indicative_price = models.DecimalField(decimal_places=2,max_digits=10)
    total_shares = models.IntegerField()
    left_shares = models.IntegerField()

class Bid(models.Model):
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE)
    investor = models.ForeignKey(Person, on_delete=models.CASCADE)
    bid_price = models.IntegerField()
    no_of_shares = models.IntegerField()
    PLACED = 0
    TRADED = 1
    REJECTED = 2
    status = models.IntegerField(choices=((PLACED ,'Placed'), (TRADED,'Traded'), (REJECTED,'Rejected')),default=1)
