# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-1"
}

variable "aws_profile" {
  description = "AWS CLI Profile"

  type    = string
  default = "private"
}
