package com.cardapio.ecommerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    private String descricao;

    @NotNull(message = "O preço é obrigatório")
    @PositiveOrZero(message = "O preço deve ser maior ou igual a zero")
    private Double preco;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProdutoImagem> imagens = new ArrayList<>();

    // Método helper para adicionar imagem
    public void adicionarImagem(ProdutoImagem imagem) {
        imagens.add(imagem);
        imagem.setProduto(this);
    }

    // Método helper para remover imagem
    public void removerImagem(ProdutoImagem imagem) {
        imagens.remove(imagem);
        imagem.setProduto(null);
    }

    // Método para obter a imagem principal
    public ProdutoImagem getImagemPrincipal() {
        return imagens.stream()
                .filter(ProdutoImagem::isPrincipal)
                .findFirst()
                .orElse(imagens.isEmpty() ? null : imagens.get(0));
    }

    // Método para verificar se o produto tem alguma imagem
    public boolean temImagem() {
        return !imagens.isEmpty();
    }
}