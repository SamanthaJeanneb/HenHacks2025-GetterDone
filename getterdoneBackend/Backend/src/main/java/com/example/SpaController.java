package com.example;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({"/"})
    public String index() {
        return "forward:/index.html";
    }

    @GetMapping({
            "/{path:^(?!api|tasks|assets|static|favicon\\.ico|robots\\.txt|manifest\\.json).*$}",
            "/**/{path:^(?!api|tasks|assets|static).*$}"
    })
    public String any() {
        return "forward:/index.html";
    }
}


