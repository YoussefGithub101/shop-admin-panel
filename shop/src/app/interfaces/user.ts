
export interface user {
   firstName: string,
   lastName: string,
   email: string,
   password: string,

}

export interface payment {
   clientData:
                     {
                        Address:string
                        Email:string
                        Name:string
                        Phone:string
                     }
   create_time:string
   id:string
   intent:string
   payer:{address: {country_code:string}} 
   email_address:string
   name:{given_name:string,surname:string}
   payer_id:string
   purchase_units:
   [
      {
         amount:{currency_code:string,value:string}
         payee:{email_address:string,merchant_id:string,}
         reference_id:string,
         shipping:
         {
            address:{address_line_1:string,address_line_2:string,admin_area_2:string,admin_area_1:string,country_code:string,postal_code:string}
            name:{full_name:string}
         }
      status:string
      }

   ]

}




