import pickle

def askPricePrediction(a, dividendPayoutRatio, noOfShares):
	filename = 'finalized_model.sav'
	loaded_model = pickle.load(open(filename, 'rb'))
	Band = loaded_model.predict(a)
	askPrice = (31.6*Band + 1.61*noOfShares)/noOfShares
	
	print(askPrice)



#Age
#Marital Status
#Sex
#Number of Kids
#Occupation
#Education Level
#House Tenure
#Income Past 12 Months



a = [['20','1', '2', '2', '16', '1','4', '1025456.68']]	
askPricePrediction(a, 0.01, 1000)