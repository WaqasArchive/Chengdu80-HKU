from django.urls import path

from . import views

app_name = 'api'
urlpatterns = [
    path('referencePrice', views.referencePrice, name='referencePrice'),
    path('addBid', views.addBid, name='addBid'),
]