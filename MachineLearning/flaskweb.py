# flask_web/app.py

from flask import Flask
import exchange
from flask import jsonify

app = Flask(__name__)
#ex = exchange.Exchange()
ex_list = {}

@app.route('/ex/v1/add_order/<string:exid>/<int:ba>/<string:id>/<float:p>/<int:q>', methods = ['GET'])
def add_order(exid,ba,id,p,q):
	if exid not in ex_list:
		ex_list[exid] = exchange.Exchange()	
	ex = ex_list[exid]
	filled=ex.add_order(ba, id, p, q)
	if filled is None:
		r={ "status": "error", 'msg':"too many order per second"}
	else:
		r={ "status": "ok", 'filled': filled}
	return jsonify(r)
@app.route('/ex/v1/get_orders/<string:exid>', methods = ['GET'])
def get_orders(exid):
	if exid in ex_list:
		ex = ex_list[exid]
		r={ "status": "ok", 'bq' : ex.bq, 'aq': ex.aq}
	else:
		r = { "status": "error", 'msg':"no order in exchange"}
	return jsonify(r)
@app.route('/ex/v1/get_max_issuer_amt/<string:exid>/<int:q>', methods = ['GET'])
def get_max_issuer_amt(exid,q):
	if exid in ex_list:
		ex = ex_list[exid]
		r={ "status": "ok", 'optimze_res' : ex.get_max_issuer_amt(q)}
	else:
		r = { "status": "error", 'msg':"no order in exchange"}
	return jsonify(r)

@app.route('/ex/v1/set_dist_mode/<string:exid>/<string:mode>', methods = ['GET'])
def set_dist_mode(exid,mode):
	if exid in ex_list:
		ex = ex_list[exid]
	else:
		ex_list[exid] = exchange.Exchange()	
		ex = ex_list[exid]
	r={ "status": "ok", 'mode' : ex.set_dist_mode(mode)}
	return jsonify(r)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
