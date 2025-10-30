package com.cardapio.ecommerce.service;

import com.cardapio.ecommerce.model.ProdutoImagem;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class ImagemService {

    @Value("${app.upload.dir:uploads/produtos}")
    private String uploadDir;

    private static final List<String> TIPOS_PERMITIDOS = Arrays.asList(
        MediaType.IMAGE_JPEG_VALUE,
        MediaType.IMAGE_PNG_VALUE,
        MediaType.IMAGE_GIF_VALUE
    );

    private static final int THUMB_WIDTH = 200;
    private static final int THUMB_HEIGHT = 200;
    private static final int MAX_WIDTH = 1024;
    private static final int MAX_HEIGHT = 1024;

    public ProdutoImagem salvarImagem(MultipartFile file) throws IOException {
        validarTipoArquivo(file);
        
        String nomeArquivo = gerarNomeUnico(file);
        Path uploadPath = criarDiretorioSeNecessario();
        Path arquivoPath = uploadPath.resolve(nomeArquivo);

        // Redimensiona e salva a imagem principal
        Thumbnails.of(file.getInputStream())
            .size(MAX_WIDTH, MAX_HEIGHT)
            .outputFormat(getExtensaoSemPonto(nomeArquivo))
            .toFile(arquivoPath.toFile());

        // Cria e salva a miniatura
        String nomeMiniatura = getNomeMiniatura(nomeArquivo);
        Path miniaturaPath = uploadPath.resolve(nomeMiniatura);
        Thumbnails.of(file.getInputStream())
            .size(THUMB_WIDTH, THUMB_HEIGHT)
            .outputFormat(getExtensaoSemPonto(nomeArquivo))
            .toFile(miniaturaPath.toFile());

        // Cria entidade ProdutoImagem
        ProdutoImagem imagem = new ProdutoImagem();
        imagem.setNomeArquivo(nomeArquivo);
        imagem.setContentType(file.getContentType());
        imagem.setTamanho(file.getSize());

        return imagem;
    }

    @Cacheable(value = "imagens", key = "#nomeArquivo")
    public byte[] buscarImagem(String nomeArquivo) throws IOException {
        Path imagemPath = Paths.get(uploadDir, nomeArquivo);
        return Files.readAllBytes(imagemPath);
    }

    public void excluirImagem(String nomeArquivo) {
        if (nomeArquivo == null || nomeArquivo.isEmpty()) return;

        try {
            Path imagemPath = Paths.get(uploadDir, nomeArquivo);
            Path miniaturaPath = Paths.get(uploadDir, getNomeMiniatura(nomeArquivo));
            
            Files.deleteIfExists(imagemPath);
            Files.deleteIfExists(miniaturaPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void validarTipoArquivo(MultipartFile file) {
        String contentType = file.getContentType();
        if (!TIPOS_PERMITIDOS.contains(contentType)) {
            throw new IllegalArgumentException("Tipo de arquivo não permitido. Apenas imagens JPEG, PNG e GIF são aceitas.");
        }
    }

    private String gerarNomeUnico(MultipartFile file) {
        String extensao = getExtensao(file.getOriginalFilename());
        return UUID.randomUUID().toString() + extensao;
    }

    private Path criarDiretorioSeNecessario() throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        return uploadPath;
    }

    private String getExtensao(String nomeArquivo) {
        if (nomeArquivo == null) return "";
        int lastDot = nomeArquivo.lastIndexOf(".");
        return lastDot > 0 ? nomeArquivo.substring(lastDot) : "";
    }

    private String getExtensaoSemPonto(String nomeArquivo) {
        String extensao = getExtensao(nomeArquivo);
        return extensao.startsWith(".") ? extensao.substring(1) : extensao;
    }

    private String getNomeMiniatura(String nomeArquivo) {
        String nome = nomeArquivo.substring(0, nomeArquivo.lastIndexOf('.'));
        String extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.'));
        return nome + "_thumb" + extensao;
    }
}