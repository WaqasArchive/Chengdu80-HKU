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
from .models import IPO,Bid,Person
# Create your views here.
def askPricePrediction(a, dividendPayoutRatio, noOfShares):
    filedirectory = os.getcwd()
    filename = '/api/finalized_model.sav'
    filepath = filedirectory+filename
    myFile = open(filepath, 'rb')
    loaded_model = pickle.load(File(myFile))
    Band = loaded_model.predict(a)
    askPrice = (31.6*Band + 1.61*noOfShares)/noOfShares
    print(askPrice)
    return round(askPrice[0],2)

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
                no_of_shares = data['no_of_shares']
                issuer_id = data['issuer_id']
                new_ipo = IPO()
                new_ipo.issuer = Person.objects.get(identify=issuer_id)
                new_ipo.symbol = new_ipo.issuer.name[:4].upper()
                new_ipo.reference_price = data["reference_price"]
                new_ipo.indicative_price = data["price"]
                new_ipo.total_shares = no_of_shares
                new_ipo.left_shares = no_of_shares
                new_ipo.save()
                return HttpResponse('')

@csrf_exempt
def get_ipos(request):
        if request.method == 'GET':
                db_ipos = IPO.objects.all()
                ipos = []
                for current_ipo in db_ipos:
                  ipos.append({
                          "issuer_id": current_ipo.issuer.identify,
                          "name": current_ipo.issuer.name,
                          "symbol": current_ipo.symbol,
                          "reference_price": current_ipo.reference_price,
                          "indicative_price": current_ipo.indicative_price,
                          "total_shares": current_ipo.total_shares,
                          "left_shares":current_ipo.left_shares
                  })
                return JsonResponse(ipos, safe=False)

@csrf_exempt
def get_ipo(request):
        if request.method == 'GET':
                issuer_id = request.GET.get('issuer_id')
                issuer = Person.objects.get(identify=issuer_id)
                current_ipo = IPO.objects.filter(issuer=issuer).first()
                ipo = {
                        "issuer_id": current_ipo.issuer.identify,
                        "name": current_ipo.issuer.name,
                        "symbol": current_ipo.symbol,
                        "reference_price": current_ipo.reference_price,
                        "indicative_price": current_ipo.indicative_price,
                        "total_shares": current_ipo.total_shares,
                        "left_shares":current_ipo.left_shares
                }
                return JsonResponse(ipo, safe=False)

@csrf_exempt
def setPrice(request):
        if request.method == 'POST':
                data = json.loads(request.body)
                issuer_id = data['issuer_id']
                issuer = Person.object(identify=issuer_id)
                ask_price = data['ask_price']
                current_ipo = IPO.objects.get(issuer=issuer)
                current_ipo.price = ask_price
                return HttpResponse('')

status = {
        Bid.TRADED: "Traded",
        Bid.PLACED: "Placed",
        Bid.REJECTED: "Rejected"
}

# "/add_bid"
@csrf_exempt
def addBid(request):
        if request.method == 'POST':
                data = json.loads(request.body)
                print(data)
                issuer_id = data['issuer_id']
                issuer = Person.objects.get(identify=issuer_id)
                ipo = IPO.objects.filter(issuer=issuer).first()
                bid_price = data['bid_price']
                no_of_shares = data['no_of_shares']
                investor_id = data['investor_id']
                new_bid = Bid()
                new_bid.bid_price = bid_price
                new_bid.no_of_shares = no_of_shares
                new_bid.ipo = ipo
                new_bid.investor = Person.objects.get(identify=investor_id)
                new_bid.status = Bid.PLACED
                url = 'http://172.16.18.112:5000/ex/v1/add_order/'+str(issuer_id)+'/1/'+str(investor_id)+'/'+str(float(bid_price))+'/'+str(no_of_shares)
                response = requests.get(url)
                received_json = response.json()
                if received_json['status'] == 'ok':
                        new_bid.save()
                        response = []
                        for item in received_json["filled"]:
                                investor_id = int(item[1])
                                if investor_id != issuer_id:
                                        investor = Person.objects.get(identify=investor_id)
                                        bid = Bid.objects.filter(investor=investor, status=Bid.PLACED).first()
                                        bid.no_of_shares = item[2]
                                        bid.bid_price = item[0]
                                        bid.status = Bid.TRADED
                                        bid.save()
                                        response.append({
                                                "ipo_name": bid.ipo.issuer.name,
                                                "ipo_symbol": bid.ipo.symbol,
                                                "investor_name": bid.investor.name,
                                                "price": bid.bid_price,
                                                "status": status[bid.status]
                                        })
                        return JsonResponse(response, safe=False)

# "/settle_bids"
@csrf_exempt
def settleBids(request):
        if request.method == 'POST':
                data = json.loads(request.body)
                issuer_id = data['issuer_id']
                ask_price = data['ask_price']
                quantity_of_shares_to_sell = data['quantity_of_shares_to_sell']
                url = 'http://172.16.18.112:5000/ex/v1/add_order/'+str(issuer_id)+'/2/'+str(issuer_id)+'/'+str(float(ask_price))+'/'+str(quantity_of_shares_to_sell)
                response = requests.get(url)
                received_json = response.json()
                if received_json['status'] == 'ok':
                        response = []
                        for item in received_json["filled"]:
                                investor_id = int(item[1])
                                if investor_id != issuer_id:
                                        investor = Person.objects.get(identify=investor_id)
                                        bid = Bid.objects.filter(investor=investor, status=Bid.PLACED).first()
                                        bid.no_of_shares = item[2]
                                        bid.bid_price = item[0]
                                        bid.status = Bid.TRADED
                                        bid.save()
                                        response.append({
                                                "ipo_name": bid.ipo.issuer.name,
                                                "ipo_symbol": bid.ipo.symbol,
                                                "investor_name": bid.investor.name,
                                                "price": bid.bid_price,
                                                "status": status[bid.status]
                                        })
                        return JsonResponse(response, safe=False)

@csrf_exempt
def getBidsInvestor(request):
        if request.method == 'GET':
                try:
                        investor_id = request.GET.get('investor_id')
                        investor = Person.objects.get(identify=investor_id)
                except:
                        return HttpResponse('Investor does not exist')
                bids = Bid.objects.filter(investor = investor)
                response = []
                for bid in bids:
                      response.append({
                                "ipo_name": bid.ipo.issuer.name,
                                "ipo_symbol": bid.ipo.symbol,
                                "investor_name": bid.investor.name,
                                "price": bid.bid_price,
                                "status": status[bid.status]
                      })
                return JsonResponse(response, safe=False)

@csrf_exempt
def getBidsIssuer(request):
        if request.method == 'GET':
                try:
                        issuer_id = request.GET.get('issuer_id')
                        issuer = Person.objects.get(identify=issuer_id)
                        ipo = IPO.objects.filter(issuer=issuer).first()
                except:
                        return HttpResponse('Issuer does not exist')
                bids = Bid.objects.filter(ipo = ipo)
                response = []
                for bid in bids:
                      response.append({
                                "ipo_name": bid.ipo.issuer.name,
                                "ipo_symbol": bid.ipo.symbol,
                                "price": bid.bid_price,
                                "investor_name": bid.investor.name,
                                "status": status[bid.status]
                      })
                return JsonResponse(response, safe=False)

