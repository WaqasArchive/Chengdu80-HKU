from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pickle
from django.core.files import File
import os
import sklearn
import json
from django.http import JsonResponse
import random

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
