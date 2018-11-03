import datetime
import time
import copy
import random
import json
debug=False
class Exchange:
	def __init__(self):
		self.order_interval = 0.0001
		self.best_bp = 0
		self.best_ap = 999999999
		self.bq = {}
		self.aq = {}
		self.id_time = {}
		self.order_seq = 50000
		self.mode="fifo"
	def set_dist_mode(self, mode):
		self.mode=mode
		return mode
	def add_order_dist(self, id, p, q):
		obq = copy.deepcopy(self.bq)
		oaq = copy.deepcopy(self.aq)
		obbp = self.best_bp
		obap = self.best_ap
		ooi = self.order_interval
		oidtime = copy.deepcopy(self.id_time)
		omode = self.mode
		self.mode="fifo"
		self.order_interval = 0.00001
		tamt = 0
		tshare = 0
		# assume no min. lot
		dist_list = {100:0.5, 200:0.3, 300:0.1, 400:0.1}
		pdist = {}
		for k in dist_list.keys():
			pdist[k]=0
		filled = self.add_order(-1, "get_amt", p, 9999999999)
		print "init filled"
		print filled

		for i in filled:
			if i[1] != "get_amt":
				tamt += i[0]*i[2]
				tshare += i[2]
				if i[2] <= 100:
					pdist[100] += 1
				elif i[2] < 200:
					pdist[200] += 1					
				elif i[2] < 300:
					pdist[300] += 1
				elif i[2] >= 400:
					pdist[400] += 1
		all_filled = copy.deepcopy(filled)



		oq = q
		tfilled =0
		for i in filled:
			if i[1] != "get_amt":
				if i[2] <= 100 and pdist[100] > 0:
					if q*dist_list[100] / pdist[100] < i[2]:
						i[2] = int(q*dist_list[100] / pdist[100])
					tfilled += i[2]
				elif i[2] < 200 and pdist[200] > 0:
					if q*dist_list[200] / pdist[200] < i[2]:					
						i[2] = int(q*dist_list[200] / pdist[200])
					tfilled += i[2]
				elif i[2] < 300 and pdist[300] > 0:
					if q*dist_list[300] / pdist[300] < i[2]:
						i[2] = int(q*dist_list[300] / pdist[300])
					tfilled += i[2]
				elif i[2] >= 400 and pdist[400] > 0:
					if q*dist_list[400] / pdist[400] < i[2]:
						i[2] = int(q*dist_list[400] / pdist[400])
					tfilled += i[2]
			else:
				issuer_order = i
		issuer_order[1] = id
		issuer_order[2] = tfilled

		self.bq = copy.deepcopy(obq)
		self.aq = copy.deepcopy(oaq)
		self.best_bp = obbp
		self.best_ap = obap
		self.id_time = copy.deepcopy(oidtime)
		self.order_interval = ooi
		self.mode = omode
		for i in self.bq.values():
			for k in i:
				for j in filled:
					#print "-----"
					#print k,k[2]
					#print "===="
					#print j,j[3]
					if k[2] == j[3]:
						k[1] = k[1] - j[2]

		for i in self.bq.values():
			new_i = i[:]
			for k in new_i:
				if k[1] == 0:
					i.remove(k)
		for i in self.bq.keys():
			if len(self.bq[i]) == 0:
				del self.bq[i]

		'''
		reamaining = copy.deepcopy(filled)
		prev_total_filled = -1
		while total_filled != prev_total_filled:
			prev_total_filled = total_filled
			print q,total_filled
			tfilled = 0
			filled = copy.deepcopy(reamaining)
			for i in filled:
				if i[1] != "get_amt":
					if i[2] <= 100:
						if q*dist_list[100] / pdist[100] < i[2]:
							i[2] = int(q*dist_list[100] / pdist[100])
						tfilled += i[2]
					elif i[2] < 200:
						if q*dist_list[200] / pdist[200] < i[2]:					
							i[2] = int(q*dist_list[200] / pdist[200])
						tfilled += i[2]
					elif i[2] < 300:
						if q*dist_list[300] / pdist[300] < i[2]:
							i[2] = int(q*dist_list[300] / pdist[300])
						tfilled += i[2]
					elif i[2] >= 400:
						if q*dist_list[400] / pdist[400] < i[2]:
							i[2] = int(q*dist_list[400] / pdist[400])
						tfilled += i[2]
			q -= tfilled
			total_filled += tfilled

			for i in filled:
				for j in reamaining:
					if j[3] == i[3]:
						j[2] -= i[2]

			#print reamaining
		print "over sub?" + str(float(tshare)/q)
		print tamt
		print tshare
		print pdist
		print tfilled
		print all_filled
		print reamaining
		'''
		#if mode == "max_amt":

		print  {"dist_list":dist_list, "filled" : filled, "total_filled" : tfilled, "share_freq" : pdist}
		return filled
	def get_max_issuer_amt(self, q=9999999999):
		obq = copy.deepcopy(self.bq)
		oaq = copy.deepcopy(self.aq)
		obbp = self.best_bp
		obap = self.best_ap
		omode = self.mode
		ooi = self.order_interval
		self.order_interval = 0.00001
		self.mode="fifo"
		oidtime = copy.deepcopy(self.id_time)
		mamt = 0
		all_amts = []
		mp = 999999999
		for p in self.bq.keys():
			self.bq = copy.deepcopy(obq)
			self.aq = copy.deepcopy(oaq)
			self.best_bp = obbp
			self.best_ap = obap
			oidtime = copy.deepcopy(self.id_time)

			tamt = 0
			tshare = 0
			#print "****->"
			#print self.bq
			#print self.aq
			#print "****<-"

			filled = self.add_order(-1, "get_max_issuer_amt", p, q)
			for i in filled:
				if i[1] == "get_max_issuer_amt":
					tamt += i[0]*i[2]
					tshare += i[2]
			all_amts.append([p,tamt])
			if tamt > mamt:
				mamt = tamt
				mp = p
				mshare = tshare
		self.mode = omode
		self.bq = copy.deepcopy(obq)
		self.aq = copy.deepcopy(oaq)
		self.best_bp = obbp
		self.best_ap = obap
		oidtime = copy.deepcopy(oidtime)
		self.order_interval = ooi
		return {"best_price" : mp, "max_amount" : mamt, "best_ask_share" : mshare, "amount_dist" : all_amts}
	def add_order(self, b_a, id, p, q,t=None):
		if self.mode != "fifo" and b_a != 1:
			return self.add_order_dist(id, p, q)
		now = datetime.datetime.now()
		if t==None:
			t=now
		if b_a == 1: # bid
			qu = self.bq
			if self.best_bp < p:
				self.best_bp = p
		else:
			qu = self.aq
			if self.best_ap > p:
				self.best_ap = p
		if not p in qu:
			qu[p] = []

		if id in self.id_time:
			idt=str(self.id_time[id])
			#print now - datetime.datetime.strptime(idt, "%Y%m%d%H%M%S")
			if (now - datetime.datetime.strptime(idt, "%Y%m%d%H%M%S")) < datetime.timedelta(seconds=self.order_interval):
				print "too fast"
				return None
			else:
				self.id_time[id] = now.strftime("%Y%m%d%H%M%S")
		else:
			print "add time"
			self.id_time[id] = now.strftime("%Y%m%d%H%M%S")

		qu[p].append([id,q, self.order_seq, t.strftime("%Y%m%d%H%M%S") ])
		self.order_seq+=1
		return self.match()
					
	def match(self):
		#print "match"
		#print self.bq
		#print self.aq
		#print self.best_bp, self.best_ap
		filled_list = []
		while self.best_ap <= self.best_bp:
			tradep = min(self.best_ap,self.best_bp)
			t_a_q = 0
			t_b_q = 0
			for i in self.aq[self.best_ap]:
				t_a_q += i[1]
			for i in self.bq[self.best_bp]:
				t_b_q += i[1]
			#print t_b_q, t_a_q 
			if t_b_q >= t_a_q:
				#print "h1.0"
				while len(self.aq[self.best_ap]) > 0:
					j = self.aq[self.best_ap].pop(0)
					filled_list.append([tradep, j[0], j[1], j[2]])
				del self.aq[self.best_ap]
				if len(self.aq) == 0:
					self.best_ap = 999999999
				else:
					self.best_ap = min(self.aq)
				while len(self.bq[self.best_bp]) > 0:
					i = self.bq[self.best_bp][0]
					if i[1] <= t_a_q:
						#print "2.0"
						#print i[1], t_a_q
						#filled_list.append(self.bq[self.best_bp].pop(0))
						j = self.bq[self.best_bp].pop(0)
						filled_list.append([tradep, j[0], j[1], j[2]])
						t_a_q -= i[1]
					else:
						#print "2.1"
						if t_a_q == 0:
							break
						#print i[1], t_a_q
						#print self.aq
						i[1] -= t_a_q
						#filled_list.append([i[0], t_a_q])
						filled_list.append([tradep, i[0], t_a_q, i[2]])
						t_a_q = 0
						break
				if len(self.bq[self.best_bp]) == 0:
					del self.bq[self.best_bp]
					if len(self.bq) == 0:
						self.best_bp = 0
					else:
						self.best_bp = max(self.bq)
			else:
				#print "h1.1"
				while len(self.bq[self.best_bp]) > 0:
					#filled_list.append(self.bq[self.best_bp].pop(0))
					j = self.bq[self.best_bp].pop(0)
					filled_list.append([tradep, j[0], j[1], j[2]])

				del self.bq[self.best_bp]
				if len(self.bq) == 0:
					self.best_bp = 0
				else:
					self.best_bp = max(self.bq)
				while len(self.aq[self.best_ap]) > 0:
					i = self.aq[self.best_ap][0]
					if i[1] <= t_b_q:
						#print "2.0"
						#print i[1], t_b_q
						j = self.aq[self.best_ap].pop(0)
						filled_list.append([tradep, j[0], j[1], j[2]])
						#filled_list.append(self.aq[self.best_ap].pop(0))
						t_b_q -= i[1]
					else:
						if t_b_q == 0:
							break
						#print "2.1"
						#print i[1], t_b_q
						i[1] -= t_b_q
						#filled_list.append([i[0], t_b_q])
						filled_list.append([tradep, i[0], t_b_q, i[2]])
						t_b_q = 0
						break
				if len(self.aq[self.best_ap]) == 0:
					del self.aq[self.best_ap]
					if len(self.aq) == 0:
						self.best_ap = 999999999
					else:
						self.best_ap = min(self.aq)


			#self.best_ap = 9999999
		if debug == True:
			if len(filled_list) > 0:
				print "filled:"
				print filled_list, self.best_bp, self.best_ap
				print "books:"
				print self.bq
				print self.aq
		return filled_list
def gen_orders():
	orders=[]
	now = datetime.datetime.now()
	for i in range(1,1000):
		id_int = random.randint(1000, 9999)
		id = "R00" + str(id_int)
		ba = 1
		price = random.randint(1,100)
		q = random.choice([100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000])
		tdelta = random.randint(-86400*10, -86400*1)
		t = (now + datetime.timedelta(seconds=tdelta)).strftime("%Y%m%d%H%M%S") 
		orders.append({"id":id, "ba": ba, "p":price, "q":q,"t":t})
	id = "P000" + str(id_int)
	ba = -1
	price = random.randint(10, 25)
	q = random.choice([100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000])
	tdelta = random.randint(-86400, 0)
	t = (now + datetime.timedelta(seconds=tdelta)).strftime("%Y%m%d%H%M%S") 
	orders.append({"id":id, "ba": ba, "p":price, "q":q, "t":t})
	print json.dumps(orders, indent=4, sort_keys=True)
if __name__ == "__main__":
	#print "start"
	ex = Exchange()
	filled=ex.add_order(-1, "P10000", 10, 100)
	nfilled = len(filled)
	filled=ex.add_order(-1, "P10001", 12, 200)
	nfilled += len(filled)
	filled=ex.add_order(-1, "P10002", 10, 300)
	nfilled += len(filled)
	filled=ex.add_order(1, "R10003", 9, 100)
	nfilled += len(filled)
	filled=ex.add_order(1, "R10004", 8, 200)
	nfilled += len(filled)
	filled=ex.add_order(1, "R10005", 9, 300)
	nfilled += len(filled)
	filled=ex.add_order(1, "R10007", 15, 700)
	nfilled += len(filled)
	filled=ex.add_order(-1, "P10006", 11, 300)
	filled=ex.add_order(1, "R10011", 7, 3000)
	filled=ex.add_order(1, "R10012", 6, 100)

	nfilled += len(filled)
	n=9
	for i in range(1,20):
		n+=1
		#time.sleep(1)
		filled=ex.add_order(1, "R1000" + str(n), 8, 100)
		nfilled += len(filled)
		filled=ex.add_order(-1, "P1000" + str(n), 6, 300)
		#nfilled += len(filled)
		print filled
	#filled=ex.add_order(-1, "P10006", 15, 300)
	#print "===="
	#print filled
	#print nfilled
	#print ex.bq
	#print ex.aq
	#print ex.get_max_issuer_amt()
	#print ex.set_dist_mode("max_amt", 7, 1000)
	#gen_orders()