function translate(text){

    var translations ={
		//-- menu
        "User":"User",
		
        //-- title
		"CashDrawerGroup":"Cash Drawer Group",
		"CashDrawerGroupMember":"Cash DrawerGroup Member",
		"CashDrawer":"CashDrawer",
		"CashDrawerGroupForm":"Cash Drawer Group",
		"UserListForm":"User List",
		"Check":"Check",
		"Warning":"Warning",
		"Confirm":"Confirm",
		"AreSureToDelete":"Are you sure you want to Delete ?",
		"AcitveThisMember":"Do you want to Active this Member?",
		
		//--tooltip
		"AddCashDrawerGroup":"Add",
		"EditCashDrawerGroup":"Edit",
		"DeleteCashDrawerGroup":"Delete",
		"AddCashDrawerGroupMember":"Add",
		"EditCashDrawerGroupMember":"Edit",
		"DeleteCashDrawerGroupMember":"Delete",
		
		

        //-- labels
        "Name":"Name",
		"No":"No",
		"Description":"Description",
		"Active":"Active",
		"IsActive":"Is Active",
		"SelectCashGroupRow":"Please Select a Group Row",
		"MemberName":"Member Name",
		"Deactive":"Deactive",
		"SelectRowEdit":"Please select record for edit",
		"SelectRowDelete":"Please Select record for delete",
        
        //-- buttons
        "Save":"Save",
        "Logout":"Logout",
		"Add":"Add",
		"Delete":"Delete",
		"Cancel":"Cancel",
		"Ok":"Ok",
		"Yes":"Yes",
		"BtnNo":"No",

    }
    return translations[text] || text
}
