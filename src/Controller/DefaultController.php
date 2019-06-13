<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
    public function index()
    {
        return $this->render(
            'base.html.twig',
            [
                'user_permissions' => $this->getUser() ? implode(',', $this->getUser()->getRoles()) : 'IS_AUTHENTICATED_ANONYMOUSLY'
            ]
        );
    }
}