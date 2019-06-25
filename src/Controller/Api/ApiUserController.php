<?php
namespace App\Controller\Api;

use App\Controller\ApiResponse;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Stopwatch\Stopwatch;

class ApiUserController extends AbstractController {
    private $passwordEncoder;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder
    ) {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function saveUser(
        Request $request,
        UserRepository $userStorage,
        ObjectManager $manager,
        $id = null
    ) {
        $stopWatch = (new Stopwatch())->start(__METHOD__);

        $data = json_decode($request->getContent(), true);

        if ($id !== null) {
            $user = $userStorage->findUserById($id);
        } else {
            $user = new User();
        }

        $user
            ->setEMail($data['email'])
            ->setPassword($this->passwordEncoder->encodePassword(
                $user,
                $data['password']
            ));

        $manager->persist($user);
        $manager->flush();

        return ApiResponse::content(
            ['status' => 'ok'],
            200,
            $stopWatch->stop()->getDuration()
        );
    }

    public function findUser(
        Request $request,
        UserRepository $userStorage
    ) {
        $stopWatch = (new Stopwatch())->start(__METHOD__);

        $params = (array) json_decode($request->attributes->get('params'));

        $emailExists = $userStorage->findUserByEmail($params['email']);

        return ApiResponse::content(
            ['email_exists' => $emailExists ? true : false],
            200,
            $stopWatch->stop()->getDuration()
        );
    }
}