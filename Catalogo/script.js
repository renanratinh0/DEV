// URL do arquivo CSV
const csvURL = 'arquivo.csv';

// Realizar uma requisição para o arquivo CSV
fetch(csvURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo CSV');
        }
        return response.text();
    })
    .then(csvData => {
        // Analisar o conteúdo do CSV
        const parsedData = Papa.parse(csvData, { header: true }).data;
        // Exibir os dados na página
        exibirCatalogo(parsedData);
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });

// Função para exibir o catálogo na página
function exibirCatalogo(produtos) {
    const catalogoDiv = document.getElementById('catalogo');
    catalogoDiv.innerHTML = '';

    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
    
        const codigoSKU = document.createElement('p');
        codigoSKU.textContent = `Código SKU: ${produto['Código (SKU)']}`;
    
        const imagem = document.createElement('img');
        imagem.src = produto['URL imagem externa 1'];
        imagem.classList.add('img-fluid', 'rounded', 'imagem-produto');
    
        const descricao = document.createElement('p');
        descricao.textContent = produto.Descrição;
    
        const preco = document.createElement('p');
        const precoValue = parseFloat(produto.Preço.replace(',', '.')); // Substituir vírgula por ponto se necessário
        const precoText = !isNaN(precoValue) ? `Preço: R$ ${precoValue.toFixed(2)}` : 'Preço indisponível';
        preco.textContent = precoText;
    
        const linkComprar = document.createElement('a');
        linkComprar.textContent = 'Comprar';
        linkComprar.href = criarLinkCompra(produto); // Define o link de compra
        linkComprar.classList.add('btn', 'btn-primary', 'w-100');
    
        produtoDiv.appendChild(codigoSKU);
        produtoDiv.appendChild(imagem);
        produtoDiv.appendChild(descricao);
        produtoDiv.appendChild(preco);
        produtoDiv.appendChild(linkComprar);
    
        catalogoDiv.appendChild(produtoDiv);
    });
}

// Função para criar o link de compra
// Função para criar o link de compra
function criarLinkCompra(produto) {
    const precoValue = parseFloat(produto.Preço.replace(',', '.')); // Substituir vírgula por ponto se necessário
    const precoText = !isNaN(precoValue) ? `R$ ${precoValue.toFixed(2)}` : 'Preço indisponível';
    const descricaoCodificada = encodeURIComponent(produto.Descrição); // Codifica a descrição
    const SKUCodificado = encodeURIComponent(produto['Código (SKU)']); // Codifica a SKU
    const precoCodificado = encodeURIComponent(precoText); // Codifica o preço
    const mensagem = `Olá! Gostaria de comprar o ${descricaoCodificada} (SKU: ${SKUCodificado}) por ${precoCodificado}. Como posso concluir a compra?`;
    const numero = '5511967486171'; // Número de telefone para o WhatsApp

    // Monta o link de compra com a mensagem
    const link = `https://api.whatsapp.com/send/?phone=${numero}&text=${mensagem}`;
    
    // Retorna o link completo
    return link;
}

