# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# System Administrator

	SysUser.create first_name:'System',last_name:'Administration',phone:'',email:'',username:'admin',encrypted_password:'admin',is_active:true,is_admin:true , department_id:1 , role_id:1 , pin_code:12345
	SysUser.create first_name:'System',last_name:'Default',phone:'',email:'',username:'default',encrypted_password:'123456',is_active:true,is_admin:false , department_id:1 , role_id:1 , pin_code:1234

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

 	CfgCompany.create legal_name:'BDK Tel.co,ltd',legal_name_khmer: 'បីឌីខេតែល​,​ខូលអិលធីឌី',company_name:'Y5net' ,
 		company_name_khmer:'វ៉ាហ្វាយណែត', 
 		tax_no:1234 , 
 		phone:' 012 345 678',
        mobile:'012 345 678 ',
        website:'www.y5net.com.kh' ,
        address:'Phnom Penh' ,
        address_khmer: '',
        logo_url: '/images/icons/logo.png',
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
    CfgUtility.create id:5 , util_name:'Maximum User', util_int:0,util_string:'', util_boolean:false,util_date:'',description:'Maximum User'
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

    #Table Status

    Status.create id:1 , code:1, status_type:'Free', name:'Active', seq_num:1, description:"Created by system"
    Status.create id:2 , code:2, status_type:'Reserved', name:'Active', seq_num:2, description:"Created by system"
    Status.create id:3 , code:3, status_type:'Occupied', name:'Active', seq_num:3, description:"Created by system"
    Status.create id:4 , code:4, status_type:'Late Checkout', name:'Active', seq_num:4, description:"Created by system"

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