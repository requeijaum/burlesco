// run_at: document_idle
const ABRIL_CODE = `
  document.querySelectorAll('.callpaywall')
    .forEach(x => x.remove());
  document.querySelectorAll('.content-blocked')
    .forEach(x => x.classList.remove('content-blocked'))
`;

const INJECTION = {
  correio24horas: {
    url: /correio24horas\.com\.br/,
    code: `
      jQuery('[class^=paywall]').remove();
      jQuery('[class$=blocked]').removeClass();
      jQuery('[id^=paywall]').removeClass('hide').removeClass('is-active');
      jQuery('.noticias-single__content__text').attr('style', 'height:auto;');
      jQuery('[id^=paywall]').remove();
    `
  },
  diariodaregiao: {
    url: /diariodaregiao\.com\.br/,
    code: `
      document.getElementsByClassName('noticia-texto')[0].style.display = 'block';
      document.querySelector('.conteudo > .row').style.display = 'none';
    `
  },
  exame: {
    url: /exame\.abril\.com\.br/,
    code: ABRIL_CODE
  },
  folhadespaulo: {
    url: /folha.uol.com.br/,
    code: `
      omtrClickUOL = function(){};function showText() {
        $("#bt-read-more-content").next().show();
        $("#bt-read-more-content").next().show().prev().remove();
      }
      setTimeout(showText, 100);
    `
  },
  nexo: {
    url: /nexojornal\.com\.br/,
    code: `
      const selectors = [
        "div[class*='PaywallBumper__wrap-container'",
        "div[class*='Datawall__wrap-container'"
      ]

      selectors.forEach(selector => {
        const element = document.querySelector(selector)
        if (element) element.remove()
      })
    `
  },
  superinteressante: {
    url: /super.abril.com.br/,
    code: ABRIL_CODE
  },
  veja: {
    url: /veja.abril.com.br/,
    code: ABRIL_CODE
  },
  jota: {
    url: /jota.info/,
    code: `
      document.getElementsByClassName('jota-paywall')[0].remove();
    `
  },
};

chrome.storage.local.get('sites', function(result) {
  for (let site in INJECTION) {
    let enabledSites = result.sites;
    if (enabledSites && enabledSites[site] == false)
      continue;
    if (INJECTION[site] == undefined)
      continue;

    if (INJECTION[site].url.test(document.location.host)) {
      var script = document.createElement('script');
      script.textContent = INJECTION[site].code;
      (document.head||document.documentElement).appendChild(script);
      script.parentNode.removeChild(script);
      break;
    }
  }
});
