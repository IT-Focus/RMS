function translate(text) {

	var translations = {
		//title
		"Point Of Sale Management System": "កម្មវិធីប្រព័ន្ធគ្រប់គ្រងការលក់",
		//-- menu
		"User": "អ្នកប្រើប្រាស់",
		"Unit Of Measurement": "រង្វាស់ឯកតា",
		"System Administration": "ការគ្រប់គ្រងប្រព័ន្ធ ",
		"Role": "តួនាទី",
		"Department": "ដេប៉ាតឺម៉ង់",
		"Menu Setup": "ការរៀបចំម៉ឺនុយ",
		"Menus Categories": "ប្រភេទម៉ឺនុយ",
		"Menus Sub Categories": "អនុប្រភេទម៉ឺនុយ",
		"Menus": "ម៉ឺនុយ",
		"Operation Setup": "ការរៀបចំប្រតិបត្ដិការ",
		"Member": "សមាជិក",
		"Take Away Customer": "អតិថិជនដែលយកចេញទៅ",
		"Currencies": "រូបិយប័ណ្ណ",
		"Exchange Rate": "អត្រាប្តូរប្រាក់",
		"Discount by Membership": "បញ្ចុះតំលៃដោយសមាជិក",
		"Discount by Permission": "បញ្ចុះតំលៃដោយមានការអនុញ្ញាត",
		"Discount by Happy Hour": "បញ្ចុះតំលៃតាមពេលវេលា",
		"Void Reason": "មូលហេតុដែលចាត់ទុកជាមោឃៈ",
		"Cash Drawer": "ថតដាក់សាច់ប្រាក់",
		"Update Price": "កែប្រែតំលៃ",
		"Restaurant Setup": "ការរៀបចំភោជនីយដ្ឋាន",
		"Kitchens": "ផ្ទះបាយ",
		"Draw Table": "គូរតុ",
		"Staff": "បុគ្គលិក ",
		"Discount Priority": "អាទិភាពនៃការបញ្ចុះតំលៃ",
		"System Configuration":"ការកំណត់ប្រព័ន្ធ",
		"Open Drawer":"បើកថត",
		"Total Order":"កាម្មង់សរុប",
		"Total Void":"Void សរុប",
		"Total Amount":"ចំនួនសរុប",
		"Total Discount":"បញ្ចុះតំលៃសរុប",
		"Grand Total":"តំលៃ​បូក​សរុប",
		"Actaul Cash":"ប្រាក់ជាក់ស្តែង",
		"Remark":"ការកត់សម្គាល់",
		
		//-- title
		"CashDrawerGroup": "ក្រុម",
		"CashDrawerGroupMember": "សមាជិក",
		"CashDrawer": "អ្នកកាន់សាច់ប្រាក់",
		"CashDrawerGroupForm": "សាច់ប្រាក់",
		"UserListForm": "បញ្ចីអ្នកប្រើប្រាស់",
		"Check": "ធីក",
		"UOM Form": "សំណុំបែបបទរង្វាស់ឯកតា ",
		"Warning": "ប្រយ័ត្ន",
		"Confirm": "បញ្ជាក់",
		"AreSureToDelete": "តើអ្នកប្រាកដជាចង់លុបមែនទេ?",
		"AcitveThisMember": "តើអ្នកចង់ដំណើរការសមាជិកនេះទេ?",
		"Profile": "ទម្រង់គណនី",
		"Discount Happy Hour Information": "ពត៍មានអំពីការបញ្ជុះតំលៃ",
		"Discount Happy Hour Form": "សំណុំបែបបទបំពេញការបញ្ជុះតំលៃ ",

		//-- title
		"CashDrawerGroup": "ក្រុម",
		"CashDrawerGroupMember": "សមាជិក",
		"CashDrawer": "អ្នកកាន់សាច់ប្រាក់",
		"CashDrawerGroupForm": "សាច់ប្រាក់",
		"UOM Form": "សំណុំបែបបទរង្វាស់ឯកតា ",
		"Menu Categories": "ប្រភេទម៉ឺនុយ",
		"Menu Categories Form": "សំណុំបែបបទប្រភេទម៉ឺនុយ",
		"Menu Sub Categories Form": "សំណុំបែបបទប្រភេទអនុម៉ឺនុយ",
		"Menu Add On": "ម៉ឺនុយបន្ថែម",
		"Menu Setup Form": "ម៉ឺនុយ",
		"Menu Information": "ពត៍មានអំពីម៉ឺនុយ",
		"Menu Price": "តំលៃម៉ឺនុយ",
		"Menu Set Form": "សំណុំបែបបទបំពេញសំណុំម៉ឺនុយ ",
		"Menu Name": "ឈ្មោះម៉ឺនុយ",
		"Menu List": "បញ្ជីនៃម៉ឺនុយ",
		"Menu Price Form": "សំណុំបែបបទបំពេញតំលៃម៉ឺនុយ",
		"Role Management": "ការគ្រប់គ្រងតួនាទី",
		"Role Form": "សំណុំបែបបទបំពេញតួនាទី",
		"Apply Permission": "អនុវត្តសិទ្ធិ",
		"User Management": "ការគ្រប់គ្រងអ្នកប្រើ",
		"User Form": "អ្នកប្រើប្រាស់",
		"Department Management": "ការគ្រប់គ្រងដេប៉ាតឺម៉ង់",
		"Department Form": "សំណុំបែបបទបំពេញដេប៉ាតឺម៉ង់",
		"Members Form": "សំណុំបែបបទបញ្ចូលសមាជិក",
		"Kitchens Form": "សំណុំបែបបទបំពេញផ្ទះបាយ",
		"Categories": "ប្រភេទម៉ឺនុយ",
		"Sub Categories": "អនុប្រភេទម៉ឺនុយ",
		"Discount Method": "ការបញ្ចុះតំលៃ ",
		"Time Range": "ការតំរៀបម៉ោង",
		"Price Range": "ការតំរៀបតំលៃ",
		"Price Range Form": "សំណុំបែបបទបំពេញតារាងតំលៃ",
		"Discount Membership Form": "សំណុំបែបបទបំពេញតារាងសមាជិកបញ្ចុះតំលៃ",
		"Time Range Form": "សំណុំបែបបទបំពេញតារាងម៉ោង",
		"Outlet Form": "Outlet",
		"Currencies Form": "សំណុំបែបបទបំពេញរូបិយប័ណ្ណ ",
		"You Can Add Member Only ":"អ្នកអាចបន្ថែមសមាជិតត្រឹមតែ ",
		"You Can Add User Only ":"អ្នកអាចបន្ថែមអ្នកប្រើប្រាស់ត្រឹមតែ ",
		"You Can Add Outlet Only ":"អ្នកអាចបន្ថែម Outlet ត្រឹមតែ ",
		"Open Balance":"ប្រាក់ដើម",
		"Close Drawer":"បិទបញ្ចី",
		"Open By":"បើកប្រាក់ដោយ",
		"Open Date":"ថ្ងៃចំហរ",
		"Group":"ក្រុម",
		
		//--tooltip
		"AddCashDrawerGroup": "បន្ថែមក្រុម",
		"EditCashDrawerGroup": "កែប្រែក្រុម",
		"DeleteCashDrawerGroup": "លុបក្រុម",
		"AddCashDrawerGroupMember": "បន្ថែមសមាជិក",
		"EditCashDrawerGroupMember": "កែប្រែសមាជិក",
		"DeleteCashDrawerGroupMember": "លុបសមាជិក",
		"Add New UOM": "បញ្ចូលរង្វាស់ឯកតា ",
		"Edit UOM": "កែប្រែរង្វាស់ឯកតា ",
		"--Search--": "--ស្វែងរក--",
		"Add New Category": "បន្ថែមប្រភេទថ្មី ",
		"Edit Category": "កែប្រែប្រភេទថ្មី ",
		"Add New Sub Category": "បន្ថែមអនុប្រភេទថ្មី ",
		"Edit Sub Category": "កែប្រែអនុប្រភេទថ្មី ",
		"Add New Add On": "បន្ថែមម៉ឺនុយបន្ថែម",
		"Delete Add On": "លុបម៉ឺនុយបន្ថែម",
		"Add New Menu": "បន្ថែមម៉ឺនុយ",
		"Edit Menu": "កែប្រែម៉ឺនុយ",
		"Add New Menu Price": "បន្ថែមតំលៃម៉ឺនុយ",
		"Edit Menu Price": "កែប្រែតំលៃម៉ឺនុយ",
		"Menu Setup": "ការរៀបចំម៉ឺនុយ",
		"Edit Menu Set ": "កែប្រែសំណុំម៉ឺនុយ ",
		"Add New Role": "បន្ថែមតួនាទីថ្មី",
		"Edit Role": "កែប្រែតួនាទី",
		"Apply System Permission": " សិទ្ធិដើម្បីអនុវត្តតួនាទីលើប្រព័ន្ធគ្រប់គ្រង",
		"Add New User": "បន្ថែមអ្នកប្រើថ្មី",
		"Edit User": "កែសម្រួលអ្នកប្រើប្រាស់",
		"Employee Code": " លេខសំគាល់បុគ្គលិក",
		"Add New Department": "បន្ថែមដេប៉ាតឺម៉ង់",
		"Edit Department": "កែសម្រួលដេប៉ាតឺម៉ង់",
		"Add New Members": "បន្ថែមសមាជិក",
		"Edit Member": "កែប្រែសមាជិក",
		"Add New Kitchens": "បន្ថែមផ្ទះបាយ",
		"Edit Kitchens": "កែប្រែផ្ទះបាយ",
		"Add New Currencies": "បន្ថែមរូបិយប័ណ្ណថ្មី",
		"Edit Currencies": "កែសម្រួលរូបិយប័ណ្ណ",
		"Add New Profile": "បន្ថែមទម្រង់គណនី",
		"Edit profile": "កែប្រែទម្រង់គណនី",
		"Add New Time Range": "បន្ថែមម៉ោងថ្មី",
		"Edit Time Range": "កែប្រែម៉ោង",
		"Add New Price Range": "បន្ថែមតំលៃថ្មី",
		"Edit Price Range": "កែប្រែតំលៃ",
		"--Categories--": "ប្រភេទម៉ឺនុយ",
		"--Sub Categories--": "អនុប្រភេទម៉ឺនុយ",
		"Move up": "រៀបឡើងលើ",
		"Move down": "រៀបចុះក្រោម",



		//-- labels
		"Name": "ឈ្មោះ",
		"No": "ល.រ",
		"Description": "បរិយាយ",
		"Active": "ដំណើរការ",
		"IsActive": "ដំណើរការ",
		"SelectCashGroupRow": "សូមជ្រើសរើសក្រុមសាច់ប្រាក់",
		"MemberName": "ឈ្មោះសមាជិក",
		"abbr": "អក្សរកាត់",
		"Deactive": "អត់ដំណើរការ",
		"SelectRowEdit": "សូមជ្រើសរើសជួរដើម្បីកែប្រែ",
		"SelectRowDelete": "សូមជ្រើសរើសជួរដើម្បីលុប",
		"Cancel": "បោះបង់",
		"Edit": "កែប្រែ",
		"Ok": "អូខេ",
		"Yes": "បាទ",
		"BtnNo": "ទេ",
		"Price From": "តំលៃពី",
		"To": "ដល់",
		"Outlet Name":"ឈ្មោះ Outlet",

		"Name": "ឈ្មោះ",
		"No": "ល.រ",
		"Description": "បរិយាយ",
		"IsActive": "សកម្មអត់",
		"abbr": "អក្សរកាត់",
		"Search": "ស្វែងរក",
		"STATUS": "ស្ថានភាព",
		"Action": "សកម្មភាព",
		"Confirm": "ការបញ្ជាក់ ",
		"yes": "យលព្រម",
		"Price": "តំលៃ",
		"Menu Set": "ម៉ឺនុយជាឈុត",
		"UOM": "រង្វាស់ឯកតា ",
		"Code": "កូដ",
		"Favorite Level": "កំរិតនៃការចូលចិត្ត",
		"Cost": "ថ្លៃដើម ",
		"Image": "រូបភាព ",
		"OK": "យលព្រម ",
		"Reset": "កំណត់ឡើងវិញ",
		"Allow": "ការអនុញ្ញាត",
		"FIRST NAME": "ឈ្មោះ",
		"LAST NAME": "នាមត្រកូល ",
		"PHONE": "ទូរស័ព្ទ",
		"EMAIL": "អ៊ីម៉ែល",
		"USERNAME": "អ្នកប្រើប្រាស់",
		"User Code": "លេខសំគាល់របស់អ្នកប្រើ",
		"Join Date": "កាលបរិច្ឆេទ",
		"User Information": "ទិន្នន័យរបស់អ្នកប្រើប្រាស់ ",
		"Sex": "ភេទ",
		"Male": "ប្រុស",
		"Female": "ស្រី",
		"User Form": "អ្នកប្រើប្រាស់",
		"User Code": "លេខសំគាល់",
		"Fist Name": "ឈ្មោះ",
		"Last Name": "នាមត្រកូល ",
		"Phone": "ទូរស័ព្ទ",
		"Email": "អ៊ីម៉ែល",
		"User Name": "អ្នកប្រើប្រាស់",
		"Address": "អាស័យដ្ឋាន",
		"Edit User": "កែសម្រួលអ្នកប្រើប្រាស់",
		"Password": " លេខសំងាត់",
		"National ID": "អត្តសញ្ញាណប័ណ្ណ",
		"Fax": "ទូរសារ",
		"Printer Name": "ឈ្មោះម៉ាស៊ីនបោះពុម្ព",
		"Start Date": "ថ្ងៃចាប់ផ្តើម",
		"End Date": "ថ្ងៃបញ្ជប់",
		"Expired Date": "ពេលផុតកំណត់",
		"Discount Profile": "បញ្ចុះតំលៃ",
		"Member Code": "លេខកូដ",
		"Reason": "ហេតុផល",
		"Note": "ចំណាំ",
		"Start Time": "ម៉ោងចាប់ផ្ដើម",
		"End Time": "ម៉ោងបញ្ចប់",
		"Start Amount": "ចាប់ពីចំនូន",
		"End Amount": "ដល់ចំនូន",
		"Discount": "បញ្ចុះតំលៃ",
		"Price Percent": "តំលៃជា%",
		"Old Price": "តំលៃចាស់",
		"New Price": "តំលៃថ្មី",
		"Price Method": "ប្រភេទតំលៃ",
		"Symbol": "និមិត្តសញ្ញា",
		"Default": "លំនាំដើម",
		"Expiration": "ការផុតកំណត់",
		"Expire": "ផុតកំណត់",
		"None expire": "មិនផុតកំណត់",
		"Maximum Discount": "បញ្ចុះតំលៃអតិបរមា",
		"Priority": "អាទិភាព",
		"Profile Name": "ឈ្មោះទំរង់",


		//-- buttons
		"ChangePassword": "ប្ដូរលេខសំងាត់",
		"Save": "រក្សាទុក",
		"Logout": "ចាកចេញ",
		"Add": "បន្ថែម",
		"Delete": "លុប",
		"Cancel": "បោះបង់",
		"Remove": "ដកចេញ",

		//alert Massage
		"Do you want to Active this Menu category?": "តើអ្នកចង់ឤេយប្រភេទម៉ឺនុយនេះសកម្មទេ?",
		"Do you want to Deactive this Menu category?": "តើអ្នកចង់ឤេយប្រភេទម៉ឺនុយនេះអសកម្មទេ?",
		"Please select record for edit": "សូមជ្រើសកំណត់ត្រាសម្រាប់ការកែសម្រួល",
		"Are you sure you want to delete?": "តើអ្នកពិតជាចង់លុបមែនទេ?",
		"Do you want to Active this sub category?": "តើអ្នកចង់ឤេយអនុប្រភេទម៉ឺនុយនេះសកម្មទេ?",
		"Do you want to Deactive this sub category?": "តើអ្នកចង់ឤេយប្រភេទម៉ឺនុយនេះអសកម្ម?",
		"Please wait while system is processing.........": "សូមរង់ចាំខណៈពេលប្រព័ន្ធត្រូវបានដំណើរការ .........",
		"Record Has Been Saved": "ទិន្នន័យត្រូវបានរក្សាទុក ។",
		"No Record Save": "ពុំមានទិន្នន័យរក្សាទុកទេ",
		"Do you want to Active?": "តើអ្នកចង់ឤេយសកម្ម!",
		"Do you want to Deactive?": "តើអ្នកចង់ឤេយអសកម្ម!",
	}
	return translations[text] || text
}