from django.urls import path

from . import views

app_name = 'api'
urlpatterns = [
    path('get_reference_price', views.referencePrice, name='referencePrice'),
    path('add_bid', views.addBid, name='add_bid'),
    path('settle_bids', views.settleBids, name='settle_bids'),
    path('add_ipo', views.addIPO, name='add_ipo'),
    path('get_ipo', views.get_ipo, name='get_ipo'),
    path('ipos', views.get_ipos, name='get_ipos'),
    path('set_price', views.setPrice, name='set_price'),
    path('get_bids_investor', views.getBidsInvestor, name='get_bids_investor'),
    path('get_bids_issuer', views.getBidsIssuer, name='get_bids_issuer'),
]
