# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# System Administrator

	SysUser.create first_name:'System',last_name:'Administration',phone:'',email:'',username:'developer',encrypted_password:'admin',is_active:true,is_admin:true , department_id:1 , role_id:1 , pin_code:12345
	SysUser.create first_name:'System',last_name:'Default',phone:'',email:'',username:'admin',encrypted_password:'123456',is_active:true,is_admin:false , department_id:1 , role_id:1 , pin_code:1234

# Menu System Administration
	SysMenu.create id:1,menu:'System Administration',icon_cls:'',expand:1,is_leaf:0,is_active:true
    SysMenu.create id:2,menu:'User',icon_cls:'icon-customer',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.user',controller:'admin.User'
    SysMenu.create id:3,menu:'Role',icon_cls:'icon-applyPermission',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.role',controller:'admin.Role'
    SysMenu.create id:4,menu:'Department',icon_cls:'icon-department',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.department',controller:'admin.Department'
    SysMenu.create id:5, menu:'System Configuration',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.CfgUtilities',controller:'admin.CfgUtilities'
    SysMenu.create id:6, menu:'Menu Profile',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.menuProfile',controller:'admin.MenuProfile'
    
    # SysMenu.create id:7,menu:'System Setup',icon_cls:'',expand:1,is_leaf:0,is_active:true
    # SysMenu.create id:8, menu:'Floor',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:7,action:'',is_active:true,view_index:'setup.floor',controller:'setup.Floor'
    # SysMenu.create id:9, menu:'Category Master',icon_cls:'icon-systemconfig',expand:0,is_leaf:7,parent_id:7,action:'',is_active:true,view_index:'setup.categoryMaster',controller:'setup.CategoryMaster'
    # SysMenu.create id:10, menu:'Room Master',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:7,action:'',is_active:true,view_index:'setup.roomMaster',controller:'setup.RoomMaster'
    # SysMenu.create id:11, menu:'Room Service Master',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:7,action:'',is_active:true,view_index:'setup.roomServiceMaster',controller:'setup.RoomServiceMaster'
    
    # SysMenu.create id:7,menu:'Room Transaction',icon_cls:'',expand:1,is_leaf:0,is_active:true
    # SysMenu.create id:12, menu:'System Configuration',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.CfgUtilities',controller:'admin.CfgUtilities'
    # SysMenu.create id:13, menu:'System Configuration',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.CfgUtilities',controller:'admin.CfgUtilities'
    # SysMenu.create id:14, menu:'System Configuration',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.CfgUtilities',controller:'admin.CfgUtilities'
    # SysMenu.create id:15, menu:'System Configuration',icon_cls:'icon-systemconfig',expand:0,is_leaf:1,parent_id:1,action:'',is_active:true,view_index:'admin.CfgUtilities',controller:'admin.CfgUtilities'
	




    Department.create name:'Administration' , description:'Created by system', is_active:true
	Role.create name:'Administration' , description:'Role for admin user' , is_active:true

 	CfgCompany.create legal_name:'IT Focus​ Technologies',legal_name_khmer: 'IT Focus​ Technologies ',company_name:'IT Focus​ Technologies ' ,
 		company_name_khmer:'IT Focus​ Technologies', 
 		tax_no:1234 , 
 		phone:' 0964444781',
        mobile:'0767777890 ',
        website:'' ,
        address:'453FB Street 907' ,
        address_khmer: '',
        logo_url: '',
        account_no:'' ,
        account_name:'' ,
        bank_name: '',
        vatin: ''

    CfgAuditrailType.create id:1 , name:'Create' , description:'for transaction create'
    CfgAuditrailType.create id:2 , name:'Update' , description:'for transaction update'
    CfgAuditrailType.create id:3 , name:'Deleted' , description:'for transaction delete'
    CfgAuditrailType.create id:4 , name:'Void' , description:'for transaction void'
    CfgAuditrailType.create id:5 , name:'Cancel' , description:'for transaction Cancel'
    CfgAuditrailType.create id:6 , name:'Transfer' , description:'for transaction transfer'
    CfgAuditrailType.create id:7 , name:'Print' , description:'for transaction transfer'

    CfgUtility.create id:1 , util_name:'Money Decimal', util_int:0,util_string:'', util_boolean:false,util_date:'',description:'Money Decimal'
    CfgUtility.create id:2 , util_name:'Date format', util_int:0,util_string:'d-m-Y', util_boolean:false,util_date:'',description:'Date format'
    CfgUtility.create id:3 , util_name:'Maximum Member', util_int:0,util_string:'', util_boolean:false,util_date:'',description:'Maximum Member'
    CfgUtility.create id:4 , util_name:'Maximum Reciept', util_int:0,util_string:'', util_boolean:false,util_date:'',description:'Maximum Reciept'
    CfgUtility.create id:5 , util_name:'Maximum User', util_int:6,util_string:'', util_boolean:false,util_date:'',description:'Maximum User'
    CfgUtility.create id:6 , util_name:'Maximum Outlet', util_int:0,util_string:'', util_boolean:false,util_date:'',description:'Maximum Outlet'
    CfgUtility.create id:7 , util_name:'Reciept Image', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:8 , util_name:'Reciept Header URL', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:9 , util_name:'Reciept Header Text', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:10 , util_name:'Invoice Image', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:11 , util_name:'Invoice Header URL', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:12 , util_name:'Invoice Header Text', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:13 , util_name:'VAT', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:14 , util_name:'VAT Value', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:15 , util_name:'Early Open Drawer', util_int:15,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:16 , util_name:'Service Tax', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:17 , util_name:'Service Tax Value', util_int:0,util_string:'', util_boolean:false,util_date:'',description:''
    CfgUtility.create id:18 , util_name:'Maximum Room', util_int:30,util_string:'', util_boolean:false,util_date:'',description:''

    #Table Status

    Status.create id:1 , code:1, status_type:'ROOM STATUS', name:'Free', seq_num:1, description:"Created by system"
    Status.create id:2 , code:2, status_type:'ROOM STATUS', name:'Reserved', seq_num:2, description:"Created by system"
    Status.create id:3 , code:3, status_type:'ROOM STATUS', name:'Occupied', seq_num:3, description:"Created by system"
    Status.create id:4 , code:4, status_type:'ROOM STATUS', name:'Late Checkout', seq_num:4, description:"Created by system"
    Status.create id:5 , code:11, status_type:'CHECK IN STATUS', name:'Check in', seq_num:1, description:"Created by system"
    Status.create id:6 , code:12, status_type:'CHECK IN STATUS', name:'Check out', seq_num:2, description:"Created by system"
    Status.create id:7 , code:13, status_type:'CHECK IN STATUS', name:'Cancel', seq_num:3, description:"Created by system"
    Status.create id:8 , code:20, status_type:'ROOM TRANSACTION', name:'Check in', seq_num:1, description:"Created by system"
    Status.create id:9 , code:21, status_type:'ROOM TRANSACTION', name:'Check out', seq_num:2, description:"Created by system"
    Status.create id:10 , code:30, status_type:'CUSTOMER PAYMENT', name:'Paid', seq_num:1, description:"Created by system"
    Status.create id:11 , code:31, status_type:'CUSTOMER PAYMENT', name:'Void', seq_num:2, description:"Created by system"
    Status.create id:12 , code:32, status_type:'CUSTOMER PAYMENT', name:'Unpaid', seq_num:3, description:"Created by system"
    #RoomServiceMaster

    RoomServiceMaster.create id:1, code:'001', service_name:'MISCELLANEOUS', abbr:'MIS', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:2, code:'002', service_name:'DAMAGES', abbr:'DAM', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:3, code:'003', service_name:'GUIDE BILL', abbr:'GIB', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:4, code:'004', service_name:'TAXI CHARGER', abbr:'TXC', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:5, code:'005', service_name:'LAUNDRY CHARGES', abbr:'LDC', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:6, code:'006', service_name:'OTHER CHARGES', abbr:'OHC', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:7, code:'007', service_name:'OUTSTANDING BILLS', abbr:'OSC', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:8, code:'008', service_name:'MINISTORE PURCHASES', abbr:'MSP', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:9, code:'009', service_name:'EXTRA BED CHARGES', abbr:'EBC', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:10, code:'010', service_name:'EXTRA PERSON CHARGES', abbr:'EPC', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:11, code:'011', service_name:'RESTAURANT FOOD BILL', abbr:'RFB', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:12, code:'012', service_name:'COMMISION PAY', abbr:'CMP', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''
    RoomServiceMaster.create id:13, code:'013', service_name:'ROOM SERVICE CHARGES', abbr:'RSC', is_include_tax:'', tax:'', charge_amount:'', created_by:'', edited_by:''

    # Next code
    NextCode.create id:1,:module => "RECEIPT",cit:1,cet:1,prefix:'RCP',length:4
    NextCode.create id:2,:module => "CHECK IN",cit:1,cet:1,prefix:'CHI',length:4
    NextCode.create id:3,:module => "USER",cit:1,cet:1,prefix:'EMP',length:4

    # Account Category
    AccountCategory.create id:1, code:1, category_name:'Direct Code', main_group:'Expend'
    AccountCategory.create id:2, code:2, category_name:'Labor Cost', main_group:'Expend'
    AccountCategory.create id:3, code:3, category_name:'Indirect Cost', main_group:'Expend'
    AccountCategory.create id:4, code:4, category_name:'Depreciation', main_group:'Expend'
    AccountCategory.create id:5, code:5, category_name:'Finance Charge', main_group:'Expend'
    AccountCategory.create id:6, code:6, category_name:'Room Revenue', main_group:'Expend'
    AccountCategory.create id:7, code:7, category_name:'Food And Beverage Revenue', main_group:'Income'
    AccountCategory.create id:8, code:8, category_name:'Service Revenue Income', main_group:'Income'
    AccountCategory.create id:9, code:9, category_name:'Other Income', main_group:'Income'
    AccountCategory.create id:10, code:10, category_name:'Asset', main_group:'Asset'
    AccountCategory.create id:11, code:11, category_name:'Liability', main_group:'Liability'
