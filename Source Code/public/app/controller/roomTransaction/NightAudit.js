Ext.define('App.controller.roomTransaction.NightAudit', {
    extend: 'Ext.app.Controller',        
    views: [
        'roomTransaction.nightAudit.Index',     

    ],
    stores: [
        'roomTransaction.NightAudit'
    ],
    init: function() {
        
        this.control({
            'nightAuditIndex button[action=Save]':{
                click:this.save
            }
            
            
        });

    },
    save:function(btn){
        var me = this;
        var form = btn.up('form'),
            record = form.getRecord(),
            values = form.getValues();

        var model = Ext.create('App.model.roomTransaction.NightAudit');
        var store = this.getRoomTransactionNightAuditStore(); 
        
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to run Night Audit ?', function(btn) {
                if (btn == 'yes') {
                     if (form.getForm().isValid() ) {

                    if (!record) {
                        model.set(values);
                        store.add(model);
                    } else {
                        record.set(values);
                    }

                    Ext.MessageBox.wait("Please wait system is processing.........", "Saving Data")

                    store.sync({

                        success: function() {
                            Ext.MessageBox.hide();
                           form.getForm().reset();
                            Util.msgSave("Complete run night audit ");

                        },
                        failure: function(batch, option, operation) {
                            Ext.MessageBox.hide();
                            store.rejectChanges();
                            var me = this ; 
                            // var msg = "Testing message";
                            var msg = "You are already run night audit today";//batch.operations[0].error;  
                       
                            setTimeout(function() {
                                 Ext.MessageBox.show({
                                    title: 'Error',
                                    message: msg,
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }, 500);
                           
                        },
                        scope: this
                    });


                } else {
                    Util.msg("Incorrect Data Entry!");
                } 
                    
                }
            });

       
    }
  



})