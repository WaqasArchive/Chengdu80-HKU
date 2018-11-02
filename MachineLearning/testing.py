from sklearn.linear_model import LinearRegression
lr = LinearRegression()
lr.fit(air[["Promotion_Budget"]+["Inter_metro_flight_ratio"]+["Service_Quality_Score"]], air[["avg_credit_card_spending_semi_annual"]])
predictions = lr.predict(air[["Promotion_Budget"]+["Inter_metro_flight_ratio"]+["Service_Quality_Score"]])
