# set-cookie-playground

Playground for `cookie` and `set-cookie` behavior.

If `SameSite` is not set, Chrome will warning on cross-origin `set-cookie`.

<img width="876" alt="image" src="https://user-images.githubusercontent.com/24741764/158136622-45a686d3-4c5e-4690-8a2f-cc8ca2a61a8c.png">

Cross-cookie can be set, but `document.cookie` will only get the cookie of current domain.

<img width="1380" alt="image" src="https://user-images.githubusercontent.com/24741764/158142106-1abba9bc-1d3e-446e-bccf-49c5f2373519.png">

```bash
> document.cookie
< 'cookie_4876_html=hello-cookie-from-html; cookie_4876_js=hello-cookie-from-js'
```

## References

- https://stackoverflow.com/a/46412839/8242705
- https://stackoverflow.com/a/63728389/8242705
- https://www.baihuzi.com/2021/07/26/%E8%B7%A8%E5%9F%9F%E8%AE%BE%E7%BD%AEcookie/
