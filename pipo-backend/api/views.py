from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pickle
from django.core.files import File
import os
import sklearn
import json
from django.http import JsonResponse
import random, requests
from .models import Bid
# Create your views here.
def askPricePrediction(a, dividendPayoutRatio, noOfShares):
    filedirectory = os.getcwd()
    filename = '/api/finalized_model.sav'
    filepath = filedirectory+filename
    myFile = open(filepath, 'rb')
    loaded_model = pickle.load(File(myFile))
    Band = loaded_model.predict(a)
    askPrice = (31.6*Band + 1.61*noOfShares)/noOfShares
    #print(askPrice)
    return askPrice[0]

@csrf_exempt
def referencePrice(request):
    if request.method == 'POST':
        json_dict = json.loads(request.body)
        age = json_dict['age']
        martial_status = json_dict['marital_status']
        sex = json_dict['sex']
        number_of_kids = json_dict['number_of_kids']
        occupation = json_dict['occupation']
        education_level = json_dict['education_level']
        house_tenure = json_dict['house_tenure']
        income_past12months = json_dict['income_past12months']
        credit_card_charge_percentage = json_dict['credit_card_charge_percentage']
        shares_offering = json_dict['shares_offering']
        pricearray = [[age,martial_status,sex,number_of_kids,occupation,education_level,house_tenure,income_past12months]]
        ask_price = askPricePrediction(pricearray,credit_card_charge_percentage,shares_offering) * random.randrange(90, 120, 1)/10
        return JsonResponse({"reference_price":ask_price})


@csrf_exempt
def addIPO(request):
        if request.method == 'POST':
                data = json.loads(request.body)
                bid_price = data['bid_price']
                no_of_shares = data['no_of_shares']
                issuer_id = data['issuer_id']
                investor_id = 'P0003'
                #print('http://172.16.18.112:5000/ex/v1/add_order/'+issuer_id+'/1/'+investor_id+'/'+str(bid_price)+'/'+str(no_of_shares))
                new_bid = Bid()
                new_bid.bid_price = bid_price
                new_bid.no_of_shares = no_of_shares
                new_bid.issuer_id = issuer_id
                new_bid.investor_id = investor_id
                new_bid.save()
                response = requests.get('http://172.16.18.112:5000/ex/v1/add_order/'+issuer_id+'/1/'+investor_id+'/'+str(bid_price)+'/'+str(no_of_shares))
                received_json = response.json()
                if received_json['status'] == 'ok':
                        return HttpResponse('')
