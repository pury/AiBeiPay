module Game {

    export class PayAiBei{

        public constructor() 
		{

        }

        //--------------------------------------------------------------------------------
        public static init(): void
        {
            var config = Config.instance;
            APay.Order.init();
            APay.Order.setDataRedirecturl(config.LEYAN_POKER_AIBEI_REDIRECTURL);
            APay.Order.setDataCpurl(config.LEYAN_POKER_AIBEI_CPURL);
            APay.Order.setIp(config.LEYAN_POKER_AIBEI_IP);
            APay.Order.setPort(config.LEYAN_POKER_AIBEI_PORT);
            APay.Order.setDataRetFunc(this.payBack);
        }
		
	//--------------------------------------------------------------------------------
        public static pay(userid, money): void
        {
            APay.Order.pay(userid, money);
        }
		
        //--------------------------------------------------------------------------------
        public static payBack(data): void
        {
            Log.L.LOG("pay back: " + data + " Type=" + data.Type + " OrderStatus=" + data.OrderStatus + "");
        }
    }
}
