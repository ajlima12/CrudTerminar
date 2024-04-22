document.addEventListener("DOMContentLoaded", function(){
    const formUsuario = document.getElementById("formUsuario");
    const listaUsuario = document.getElementById("listaUsuario");

    function carregaUsuario(){
        fetch("usuario.php")
        .then(response => response.json())
        .then(data => {
            listaUsuario.innerHTML = "";
            data.forEach(usuario => {
                const usuarioHTML = `
                <div class="usuario">
                    <p><strong>Nome:</strong> ${usuario.nome}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Data de Nascimento:</strong>${usuario.data_nascimento}</p>
                    <button onclick="editaUsuario(${usuario.id})">Editar</button>
                    <button onclick="deletaUsuario(${usuario.id})">Deletar</button>
                </div>
            `;

            listaUsuario.innerHTML += usuarioHTML;

            });
        });      
    }

    formUsuario.addEventListener("submit", function(event){
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const dataNascimento = document.getElementById("dataNascimento").value;

        fetch("usuario.php", {
            method: "POST",
            body: JSON.stringify({nome, email, dataNascimento})
        })

        .then(response => response.json())
        .then(() => {
            carregaUsuario();
            formUsuario.reset();
        });
    });

    window.deletaUsuario = function(id){
        if (confirm("Deseja realmente deletar este usuário?")){
            fetch(`usuario.php?id=${id}`, {
                method: "DELETE"
            })

            .then(() => {
                carregaUsuario();
            });
        }
    }

    window.editaUsuario = function(id) {
        fetch(`usuario.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nome").value = data.nome;
            document.getElementById("email").value = data.email;
            document.getElementById("dataNascimento").value = data.data_nascimento;
        });

    }
    carregaUsuario();
});