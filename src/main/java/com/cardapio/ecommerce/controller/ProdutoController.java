package com.cardapio.ecommerce.controller;

import com.cardapio.ecommerce.model.Produto;
import com.cardapio.ecommerce.model.ProdutoImagem;
import com.cardapio.ecommerce.repository.ProdutoRepository;
import com.cardapio.ecommerce.service.ImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ImagemService imagemService;

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("produtos", produtoRepository.findAll());
        return "produto/lista";
    }

    @GetMapping("/novo")
    public String novo(Model model) {
        model.addAttribute("produto", new Produto());
        return "produto/form";
    }

    @PostMapping("/salvar")
    public String salvar(
            @Valid Produto produto,
            BindingResult result,
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "imageUrls", required = false) List<String> imageUrls,
            @RequestParam(value = "imagemPrincipalIndex", required = false) Integer imagemPrincipalIndex,
            RedirectAttributes redirectAttributes) {

        if (result.hasErrors()) {
            return "produto/form";
        }

        try {
            // Processa uploads de arquivo
            if (files != null && !files.isEmpty()) {
                for (int i = 0; i < files.size(); i++) {
                    MultipartFile file = files.get(i);
                    if (!file.isEmpty()) {
                        ProdutoImagem imagem = imagemService.salvarImagem(file);
                        imagem.setPrincipal(i == imagemPrincipalIndex);
                        produto.adicionarImagem(imagem);
                    }
                }
            }

            // Processa URLs de imagem
            if (imageUrls != null && !imageUrls.isEmpty()) {
                for (int i = 0; i < imageUrls.size(); i++) {
                    String url = imageUrls.get(i);
                    if (url != null && !url.trim().isEmpty()) {
                        ProdutoImagem imagem = new ProdutoImagem();
                        imagem.setImagemUrl(url);
                        imagem.setPrincipal(i == imagemPrincipalIndex);
                        produto.adicionarImagem(imagem);
                    }
                }
            }

            produtoRepository.save(produto);
            redirectAttributes.addFlashAttribute("mensagem", "Produto salvo com sucesso!");
            return "redirect:/produtos";

        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("erro", "Erro de validação: " + e.getMessage());
            return "produto/form";
        } catch (IOException e) {
            redirectAttributes.addFlashAttribute("erro", "Erro ao processar imagem: " + e.getMessage());
            return "produto/form";
        }
    }

    @GetMapping("/editar/{id}")
    public String editar(@PathVariable Long id, Model model) {
        model.addAttribute("produto", produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID inválido:" + id)));
        return "produto/form";
    }

    @GetMapping("/excluir/{id}")
    public String excluir(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID inválido:" + id));

        // Exclui todas as imagens do produto
        for (ProdutoImagem imagem : produto.getImagens()) {
            if (imagem.getNomeArquivo() != null) {
                imagemService.excluirImagem(imagem.getNomeArquivo());
            }
        }

        produtoRepository.delete(produto);
        redirectAttributes.addFlashAttribute("mensagem", "Produto excluído com sucesso!");
        return "redirect:/produtos";
    }

    @DeleteMapping("/imagem/{produtoId}/{imagemId}")
    @ResponseBody
    public ResponseEntity<?> excluirImagem(@PathVariable Long produtoId, @PathVariable Long imagemId) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        ProdutoImagem imagem = produto.getImagens().stream()
                .filter(img -> img.getId().equals(imagemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Imagem não encontrada"));

        if (imagem.getNomeArquivo() != null) {
            imagemService.excluirImagem(imagem.getNomeArquivo());
        }

        produto.removerImagem(imagem);
        produtoRepository.save(produto);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/imagem/{produtoId}/principal/{imagemId}")
    @ResponseBody
    public ResponseEntity<?> definirImagemPrincipal(@PathVariable Long produtoId, @PathVariable Long imagemId) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        produto.getImagens().forEach(img -> img.setPrincipal(img.getId().equals(imagemId)));
        produtoRepository.save(produto);

        return ResponseEntity.ok().build();
    }
}