import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Maybe } from "graphql/jsutils/Maybe";

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | Maybe<string> ) {
    return this.sanitizer.bypassSecurityTrustHtml(value || "");
  }
}