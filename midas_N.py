# [midas_N.py]
import yfinance as yf
import pandas as pd
import numpy as np
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()  # Load Binance API key from .env

class MidasAlgo:
    def __init__(self, initial_fund, markets, allocations, buy_thresholds, sell_triggers, buy_multiplier, cascade_rates):
        self.fund = initial_fund
        self.markets = markets
        self.allocations = allocations
        self.buy_thresholds = buy_thresholds
        self.sell_triggers = sell_triggers
        self.buy_multiplier = buy_multiplier
        self.cascade_rates = cascade_rates
        self.trades = []
        self.profits = {'daily': 0, 'weekly': 0, 'monthly': 0}
        self.api_key = os.getenv('BINANCE_API_KEY')

    def fetch_data(self, market):
        end_date = datetime.now()
        start_date = end_date - timedelta(days=90)
        data = yf.download(market, start=start_date, end=end_date, interval='1h')
        return data['Close']

    def execute_trades(self):
        for market, alloc in zip(self.markets, self.allocations):
            data = self.fetch_data(market)
            investment = self.fund * alloc
            for i in range(1, len(data)):
                price_change = (data[i] - data[i-1]) / data[i-1]
                for layer, thresholds in self.buy_thresholds.items():
                    if price_change <= min(thresholds):
                        buy_amount = investment * self.buy_multiplier
                        if self.execute_buy(market, buy_amount, data[i]):
                            sell_price = data[i] * (1 + self.sell_triggers[layer])
                            if self.execute_sell(market, buy_amount, sell_price):
                                profit = buy_amount * (sell_price / data[i] - 1)
                                self.profits['daily'] += profit
                                self.trades.append({
                                    'market': market,
                                    'layer': layer,
                                    'profit': profit,
                                    'date': data.index[i]
                                })

    def execute_buy(self, market, amount, price):
        # Placeholder: Binance API buy
        return True

    def execute_sell(self, market, amount, price):
        # Placeholder: Binance API sell
        return True

    def cascade_profits(self):
        daily_profit = self.profits['daily']
        graei_share = daily_profit * 0.1  # 10% to meta2graei@gmail.com
        self.send_graei_share(graei_share)
        for period, rate in self.cascade_rates.items():
            cascade_amount = daily_profit * rate
            self.profits[period] += cascade_amount
            self.profits['daily'] -= cascade_amount

    def send_graei_share(self, amount):
        # Placeholder: PayPal API to meta2graei@gmail.com
        print(f"Sending {amount} to meta2graei@gmail.com via PayPal")

    def run(self):
        self.execute_trades()
        self.cascade_profits()
        return {
            'total_profits': sum(self.profits.values()),
            'trades': self.trades,
            'roi': (sum(self.profits.values()) / self.fund) * 100
        }

# License: Graeitrade Commercial License - RANDALL LUJAN - 10% royalty
