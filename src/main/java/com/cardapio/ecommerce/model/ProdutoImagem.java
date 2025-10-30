package com.cardapio.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ProdutoImagem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeArquivo;
    private String imagemUrl;
    private String contentType;
    private Long tamanho;
    private boolean principal;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    // Método helper para obter a URL completa da imagem
    public String getImagemCompleta() {
        if (nomeArquivo != null && !nomeArquivo.isEmpty()) {
            return "/uploads/produtos/" + nomeArquivo;
        }
        return imagemUrl != null ? imagemUrl : "";
    }

    // Método para obter a URL da miniatura
    public String getMiniaturaUrl() {
        if (nomeArquivo != null && !nomeArquivo.isEmpty()) {
            String nome = nomeArquivo.substring(0, nomeArquivo.lastIndexOf('.'));
            String extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.'));
            return "/uploads/produtos/" + nome + "_thumb" + extensao;
        }
        return imagemUrl != null ? imagemUrl : "";
    }
}