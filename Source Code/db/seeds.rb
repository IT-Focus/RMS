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