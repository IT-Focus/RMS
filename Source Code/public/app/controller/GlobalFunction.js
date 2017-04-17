var me;

Ext.define('App.controller.GlobalFunction', {
	extend: 'Ext.app.Controller',
	init: function() {

		this.control({

		});
		this.loadDefaultConfig();
	},
	globalParams:{} , 
	recalculateCheckInAmount:function(form){
		var me = this ; 
		var values = form.getValues(); 
		var store = null ; 
		if(values.rental_type == "plan"){
			store = form.down('grid[name=roomDetail]').getStore();
		}else{
			store = form.down('grid[name=roomDetailByRate]').getStore();
		}
		//debugger; 
		var totalAmount = me.number(store.sum('total_amount')) ; 		 
		var amountPaid = me.number(form.down('numberfield[name=paid_booking]').getValue() ); 
		var taxAmount = me.number( store.sum('tax_amount') ); 

		var discountAmount =( me.number(values.discount) * totalAmount ) / 100    ; 
		var otherChargeAmount = 0 ; 
		var balanceAmount = totalAmount - discountAmount - amountPaid  ; 
		

		//========== set value 
		var objResult  ={
			tax_amount:taxAmount.toFixed(2) , 
			total_amount:totalAmount.toFixed(2) , 
			discount_amount:discountAmount.toFixed(2) , 
			paid_booking:amountPaid.toFixed(2) , 
			grand_total_amount:balanceAmount.toFixed(2) , 
			other_charge: 0 , 
		};
		
		form.getForm().setValues(objResult);
		form.down('numberfield[name=paid_booking]').setValue(amountPaid);
	}, 
	number:function(amount){
		if (amount) {
			return Number(amount) ; 
		}else{
			return 0 ; 
		}
	}, 
	loadDefaultConfig:function(){
		var me = this ; 
		Util.ajax('Home/get_config',{} ,me.afterLoadDefaultConfig ,me );
	}, 
	afterLoadDefaultConfig:function(obj , me ){

		obj.data.forEach(function(rec){
			switch (rec.description) {
			    case 'VAT':
			        me.globalParams.VAT = rec.util_boolean ; 
			        break;
			    case 'VAT Value':
			        me.globalParams.VATValue = rec.util_int; 
			        break;
			}
		})
	}

});
window.GlobalFunction = Ext.create('App.controller.GlobalFunction');
