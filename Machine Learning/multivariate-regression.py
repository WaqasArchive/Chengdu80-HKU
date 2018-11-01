import pandas as pd
import csv
import numpy as np
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn import linear_model
from sklearn import metrics
from sklearn.preprocessing import Normalizer
from regressors import stats



#Read the CSV FileExistsError
read_input = pd.read_csv("Average credit card spending across factors.csv")
df = pd.DataFrame(read_input)
df = df.replace('nan', 0)


#print(df)
#print(read_input.shape)

#sns.pairplot(read_input, x_vars = ['age', 'marital_status','sex', 'number_of_kids', 'occupation', 'education_level', 'house_tenure', 'income_past12months'], y_vars = 'avg_credit_card_spending_semi_annual', size = 7, aspect = 0.5, kind ='reg')

feature_cols = ['age', 'marital_status','sex', 'number_of_kids', 'occupation', 'education_level', 'house_tenure', 'income_past12months']

DataNeeded = df[feature_cols]

#print(DataNeeded)


#print(DataNeeded.shape)

y = df['avg_credit_card_spending_semi_annual']


#print(y)

#Spltting Test and Training data into 75-25 ratio 

DataNeeded_train, DataNeeded_test, y_train, y_test = train_test_split(DataNeeded, y, train_size=0.85, random_state=0)

print(DataNeeded_train.shape)
print(y_train.shape)
#print(DataNeeded_test.shape)
#print(y_test.shape)

#Instantiate Linear Regression Model

model = linear_model.LinearRegression()
model.fit(DataNeeded_train, y_train)

#Printing 
print(model.intercept_)
print(model.coef_)

#Pairing Feature names with Coefficients 
print(list(zip(feature_cols, model.coef_)))

y_pred = model.predict(DataNeeded_test)

#print(metrics.mean_squared_error(y_test, y_pred))

np.mean((y_pred-y_test)**2)

print(y_test[5:10])

print(y_pred[5:10])

print("Accuracy:", model.score(DataNeeded_test, y_test))

# To calculate the p-values of beta coefficients: 
print("coef_pval:\n", stats.coef_pval(model, DataNeeded, y))

