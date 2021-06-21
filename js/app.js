//appel du DOM
document.addEventListener('DOMContentLoaded',()=>{
    const articles = document.querySelector('#article');
    const articleForm = document.querySelector('#ajouter-article-form');
    articleForm.addEventListener('submit', ajouterArticle);
  
    fetch(' http://localhost:3000/articles',{
        method:"GET",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(articles=>articles.forEach(afficherArticle))
        function afficherArticle(article) {
        const articleDIV= document.createElement('div');
        articleDIV.dataset.id= article.id
        articleDIV.id = "card-article" + article.id;
        articleDIV.className='card '
        articleDIV.innerHTML =
        
        `
        <div class="col-xs3 col-md3 row-sm4  ">
        <div class="card  shadow-1 hoverable-1 rounded-3 bd-blue bd-r-solid bd-l-solid bd-3 txt-center "  >
            <div class="card-image">
                <img src="${article.articleImage}" class="container-field" alt="logo"  />
            </div>
            <div class="card-header">${article.title}</div>
            <div class="divider"></div>
            <div class="card-content" >
            ${article.articleDescription}
            </div>
            <div class="divider"></div>
            <div class="card-content txt-center">Prix: ${article.articlePrix} €</div>
            <div class="divider"></div>
            
            </div>
</div>
        `
            articles.appendChild(articleDIV)
            const btnDelete = document.createElement("Button");
    btnDelete.setAttribute("id",`btnDelete${article.id}`);
    btnDelete.innerHTML = `supprimer: ${article.title}`;
    btnDelete.className = "btn-group btn error rounded-1 small right-aligned";
    articleDIV.appendChild(btnDelete);
    btnDelete.addEventListener('click', () => deleteArticle(article));
    function deleteArticle(article) {
        const cardArticle = document.querySelector(`#card-article${article.id}`)
        console.log(cardArticle);
        return fetch(` http://localhost:3000/articles/${article.id}`, {
            method:'Delete'
        })
        .then(response => response.json())
        .then(() => {
            cardArticle.remove()
        })
            }
           /********************************Detail**********************************/
    const btnDetails = document.createElement('button');
    btnDetails.setAttribute("id", `${article.id}`);
    btnDetails.innerHTML = 'Details:' + article.title;
    btnDetails.className = "btn-group btn rounded-1 small primary press mt-2 right-aligned " ;
    articleDIV.appendChild(btnDetails);
    btnDetails.addEventListener('click', () => detailsarticle(article));
    
    /************fonction details************************/
    function detailsarticle(article) {
        const cardArticle = document.querySelector(`#card-article${article.id}`);
        return fetch(` http://localhost:3000/articles/${article.id}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(article=>afficherDetailsArticle(article))
    }
    function afficherDetailsArticle(article) {
        const detailsContainer = document.querySelector("#detailsarticle");

        articles.animate([
            { transform: "translateX(0px)" },
            { transform: "translateY(-300px)" }
        ], {
            duration: 200,
        });
        setTimeout(() => {
            articles.style.display = "none"
        }, 200)
        detailsContainer.innerHTML = `
        <div class="col-xs3 col-md3 row-sm4 ">
        <div class="card shadow-1 hoverable-1 rounded-3 bd-blue bd-r-solid bd-l-solid bd-3 txt-center "  >
            <div class="card-image">
                <img src="${article.articleImage}" class="container-field" alt="logo"  />
            </div>
            <div class="card-header">${article.title}</div>
            <div class="divider"></div>
            <div class="card-content" >
            ${article.articleDescription}
            </div>
            <div class="divider"></div>
            <div class="card-content txt-center">Prix: ${article.articlePrix} €</div>
            <div class="divider"></div>
            <div class="card-footer"><a href="http://localhost/json/" class="btn btn-primary shadow-1 rounded-1">retour</a></div>
            </div>
</div>

`

    }  
/**********************************btn update***********************************/
        //creation btn
        const btnUpdate = document.createElement('button');
        //btn + id
        btnUpdate.setAttribute('id', `btnUpdate${article.id}`)
        //btn txt
        btnUpdate.innerHTML = 'Edit:' + article.title;
        //class axentix
        btnUpdate.className = "btn-group btn rounded-1 small primary press mt-2 right-aligned";
        //div enfant
        articleDIV.appendChild(btnUpdate);
        //btn declenche action
        btnUpdate.addEventListener('click', () => editArticle(article))

    }
       
   
   


         /********************************* MISE A JOUR************************************/
         function editArticle(article){
             //ajout formulaire
             const ajouterForm = document.getElementById("ajouter-article-form");
             //style
             ajouterForm.animate([
                 {opacity: 1},
                 {opacity: 0}
             ],{
                 duration:500,
             });
            
             setTimeout(() =>{
                 ajouterForm.style.display = "none"
             }, 500);

             //creer formulaire
             const editForm = document.createElement('form');
             editForm.id = "edit-form";
            
             editForm.innerHTML = `
             <h3 class="red-text">Modifier un article</h3>
             <form id="ajouter-article-form">
             <div class="form-field">
               <label>Nom articles</label>
               <input class="form-control" value="${article.title}" type="text" name="title">
             </div>
       
             <div class="form-field">
               <label>Description articles</label>
               <input class="form-control" value="${article.articleDescription}" type="text" name="articleDescription">
             </div>
       
             <div class="form-field">
               <label>Prix articles</label>
               <input class="form-control" value="${article.articlePrix}" type="text" name="articlePrix">
             </div>
       
             <div class="form-field">
               <label>Image  articles</label>
              <!-- <input type="file" id="fileUpload" name="articleImage"/>-->
               <input  class="form-control"  value="${article.articleImage}" type="text" name="articleImage" >
             </div>
       
             <div class="form-field txt-center">
                 <button class="btn shadow-1 rounded-1 outline opening txt-blue " type="submit"><span class="outline-text">Valider</span></button>
            <input class="btn btn-outline-info" value="Ajouterarticle" type="submit">
             </div>
           </form>
             `
             
            updateForm.appendChild(editForm);
            
             editForm.addEventListener('submit', (event) => updateArticle(event, article))
         }

       
         function updateArticle(event, article){
          
            event.preventDefault();
            //Recup des valeur 
            let updatedArticle = donneeFormulaires;
            //debug
            console.log(updatedArticle, article.id);
      
            fetch(`http://localhost:3000/articles/${article.id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(updatedArticles)
            })
                //Prommesse +  format json
                .then(response => response.json())
                .then(function (){
                   
                    console.log('VOTRE PRODUIT A ETE MIS JOUR')
                    window.location.reload()
                    afficherArticle(article)
                })

         }

    /**************************************************ajout*************************************************************/
    function donneeFormulaires(event) {
        event.preventDefault();
        return {
            title: `${event.target.title.value}`,
            articleDescription: `${event.target.articleDescription.value}`,
            articleImage: `${event.target.articleImage.value}`,
            articlePrix: `${event.target.articlePrix.value}`,
        }
    }
    function ajouterArticle(event) {
        event.preventDefault();
        let newArticle = donneeFormulaires(event);
        //console.log(newArticle);
        event.preventDefault();
        return fetch(' http://localhost:3000/articles', {
            method: 'POST',
            headers: {
                'Access-control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArticle)
           
        })
            .then(response => response.json())
            .then(article => afficherArticle(article))
            
    }
    
   
})

 