
const vue = new Vue ({
    el: '#vue',
    data: {
        view:"articles",
        getOnePage:[],
        oneArticle: "",
        compteur:0,
        prix:0,
        panier:[],
        article:{},
        pageActuelle : 1
        
    },
    methods: {
        getApi(id){
            
            this.vue = "articles"
            url = 'http://vps-a47222b1.vps.ovh.net/Tshirt/page/'+id;
            axios.get(url)
            .then(response => {

                if(response.status == 200){
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    document.documentElement.style.scrollBehavior = "smooth"
                    this.pageActuelle = id
                    data = response.data
                    console.log(response.data);
                   
                   for(let i =0; i<data.length; i++){
                        let price = data[i].price.replace("$", "");
                        let priceNumber = Number(price);                      
                        data[i].price = priceNumber;
                       
                   }

                   console.log(data)
                   this.getOnePage = data;


                } else{

                

                }


            })
        },

        getArticle(id){
            this.vue = "oneArticle"
            url = 'http://vps-a47222b1.vps.ovh.net/Tshirt/'+id;
            axios.get(url)
            .then(response => {

                if(response.status == 200){
                    // this.oneArticle = response.data
                    data = response.data;
                    
                    
                        let price = data.price.replace("$", "");
                        let priceNumber = Number(price);
                        data.price = priceNumber;
                       
                   

                     this.oneArticle = data

                    console.log(response.data);


                } else{

                }

            })
        },

        addArticle(id, nom, image,   prix ){
            this.compteur++
           
            article = {}
            article.id = id;
            article.nom = nom;
            article.image = image;
            article.prix = prix;
            articlesPanier=[];
            envoisarticle = []
            this.prix += article.prix          

                for(let i = 0; i<this.panier.length; i++){
                  articlesPanier.push(this.panier[i].id);
                 
                }


                if(articlesPanier.includes(id)==false){
                    article.quantite=1
                  this.panier.push(article);

                }

                if(articlesPanier.includes(id)==true){
                    for(j=0; j<this.panier.length; j++){
                        if(this.panier[j].id==id){
                            this.panier[j].quantite++;
                        }
                    }
                }
            
            articlesPanier=[];
            console.log(this.panier)
            
          return this.panier;
        },

        getPanier(){
            let panier = document.querySelector('.containerPanier')
            let body = document.querySelector('.template');
            
            if(this.panier.length>0){
                panier.classList.toggle('active');
            }

            if(panier.classList.contains("active")){
                body.style.opacity = 0.5
                body.style.transition = "opacity 0.3s ease-in-out 0s"
            }else{
                body.style.opacity = 1
            }

            body.addEventListener("click", function(){
                panier.classList.remove('active');
                body.style.opacity = 1
            })

            
         
         
        },

        addQuantity(id){
            for(let i=0; i<this.panier.length; i++){
                if(this.panier[i].id == id){
                    this.panier[i].quantite ++ 
                    this.compteur ++
                    console.log(this.panier[i])
                    this.prix += this.panier[i].prix
                }
            }
        },

        removeQuantity(id){
            for(let i=0; i<this.panier.length; i++){
                if(this.panier[i].id == id){
                    // let index = i+4
                    this.panier[i].quantite --
                    this.compteur --
                    this.prix -= this.panier[i].prix
                    if(this.panier[i].quantite == 0){
                        let index = this.panier.indexOf(this.panier[i])
                        this.panier.splice(index,1)
                    }

                    if(this.compteur == 0){
                        let container = document.querySelector(".containerPanier");
                        let body = document.querySelector(".template")
                        container.classList.remove('active')
                        body.style.opacity = 1
                    }
                }
            }
        }

 
       
    },

    beforeMount(){
        this.getApi(1);
      
    },
    computed: {
      
    },
})