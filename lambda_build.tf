data "archive_file" "lambda_hello_world" {
  type = "zip"

  source_dir  = "${path.module}/hello-world"
  output_path = "${path.module}/hello-world.zip"
}

data "archive_file" "lambda_hello_go" {
  type = "zip"

  source_file = "${path.module}/hello-go/main"
  output_path = "${path.module}/hello-go.zip"

  depends_on = [
    null_resource.go_build
  ]
}

data "local_file" "go_main_file" {
  filename = "${path.module}/hello-go/main.go"
}

data "local_file" "go_mod_file" {
  filename = "${path.module}/hello-go/go.mod"
}

resource "null_resource" "go_build" {
  triggers = {
    code = "${data.local_file.go_main_file.content}"
    mod  = "${data.local_file.go_mod_file.content}"
  }

  provisioner "local-exec" {
    working_dir = "${path.module}/hello-go"
    command     = "GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o main main.go"
  }
}
