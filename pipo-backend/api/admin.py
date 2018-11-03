from django.contrib import admin

# Register your models here.
from .models import Person,IPO,Bid
admin.site.register(Bid)
admin.site.register(IPO)
admin.site.register(Person)